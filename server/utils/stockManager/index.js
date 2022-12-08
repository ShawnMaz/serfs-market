// main file defining the stock manager on the backend
// import our models
const { Stock, News } = require('../../models');
// import our events
const events = require('./events'); // loaded as array
// global variable that stores likelihood of an event triggering
// if event func rolls below this, trigger an event
// otherwise increase this value by 5
let eventChance = 5;

// write a more accurate setInterval function
function intervalTimer(callback, interval = 1000) { // 1 second default
  let counter = 1;
  let timeoutId;
  const startTime = Date.now();

  function main() {
    const nowTime = Date.now();
    const nextTime = startTime + counter * interval;
    timeoutId = setTimeout(main, interval - (nowTime - nextTime));

    counter += 1;
    callback();
  }

  timeoutId = setTimeout(main, interval);

  return () => {
    clearTimeout(timeoutId);
  }
}

// main function, randomizes stock values
async function randomizeStock() {
  // get an array of our stocks
  const stocks = await Stock.find().select('-__v');
  
  // loop over each stock and modify their price
  for (const stock of stocks) { // this format allows using async
    // generate a random amount to change it by
    const changeMult = Math.random() * 3;
    const change = ((Math.random() * 30) - 15) * changeMult; // positive and negative values
    let newPrice = Math.round(stock.stockPrice + change);
    // clamp to a minimum price of 1
    if (newPrice < 0 ) {
      newPrice = 1;
    }

    // now update our stock by this amount
    const updatedStock = await Stock.findOneAndUpdate(
      { _id: stock._id },
      { stockPrice: newPrice },
      { new: true }
    );

    // check for a news bulletin update if change is significant
    if (change > Math.abs(20)) {
      // refresh old bulletin
      const bulletin = await News.find().sort('-date');
      if (bulletin && bulletin.length > 9) {
        for (let i = 0; i < bulletin.length - 8; i++) {
          bulletin.pop();
        }
        const deletedBulletin = await News.deleteMany();
        const newBulletin = await News.insertMany(bulletin);
      }

      // push news event to database
      const news = await News.create({
        eventName: "Significant market changes...",
        eventDescription: `The value of ${stock.stockName} has shifted by ${Math.round(change) * stock.multiplier}.`
      });
    }
  }
}

// secondary function, responsible for managing special events every half hour
async function triggerEvent() {
  // fetch our stocks from db
  const stocks = await Stock.find().select('-__v');

  // reset each stock's modifier
  for (const stock of stocks) {
    const updatedStock = await Stock.findOneAndUpdate(
      { _id: stock._id },
      { multiplier: 1 },
      { new: true }
    );
  }

  // do our event roll
  const rollEvent = Math.random() * 100;
  if (rollEvent < eventChance) {
    // our event has triggered
    // now randomly select one from the list
    const eventIndex = Math.floor(Math.random() * events.length);
    const event = events[eventIndex]; // select our event
    event(); // call it
  } else {
    eventChance += 5; // otherwise increase the odds of an event triggering next time
  }
}

// assign functions to our custom intervalTimer function
// wrap in a new function so it can be exported
function updateStock() {
  intervalTimer(randomizeStock, 1000 * 60 * 5);
}
function updateEvent() {
  intervalTimer(triggerEvent, 1000 * 60 * 60);
}

module.exports = { updateStock, updateEvent };
