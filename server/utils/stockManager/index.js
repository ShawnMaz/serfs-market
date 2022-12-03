// main file defining the stock manager on the backend
// import our models
const { Stock } = require('../../models');
// import our events
const events = require('./events/events.json'); // stored as array

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
    const change = (Math.random() * 60) - 30; // positive and negative values
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
    console.log(updatedStock);
  }
}

// secondary function, responsible for managing special events every half hour
async function triggerEvent() {
  
}

// assign this function to our custom intervalTimer function
// wrap in a new function so it can be exported
function updateStock() {
  intervalTimer(randomizeStock, 1000 * 60 * 10);
}

module.exports = { updateStock };
