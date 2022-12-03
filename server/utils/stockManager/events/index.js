// define our events
// import our models
const { Stock } = require('../../../models');

// wartime event
async function warTrigger() {
  // fetch our stocks
  const stocks = await Stock.find({ stockCategory: 'weaponry' }).select('-__v');

  // display that an event has been triggered
  console.log("War amongst the kingdoms is anticipated; The value of weaponry has skyrocketed!");
  // calculate a multiplier
  const multiplier = Math.round((Math.random() * 3) + 2);

  // update our stock multipliers
  for (const stock of stocks) {
    const updatedStock = await Stock.findOneAndUpdate(
      { _id: stock._id },
      { multiplier: multiplier },
      { new: true }
    );
  }
}

// famine event
async function famineTrigger() {
  // fetch our stocks
  const stocks = await Stock.find({ stockCategory: 'food' }).select('-__v');

  // display that an event has triggered
  console.log("Famine has struck the lands; the value of food has skyrocketed!");
  // calculate a multiplier
  const multiplier = Math.round((Math.random() * 3 + 2));

  // update our stock multipliers
  for (const stock of stocks) {
    const updatedStock = await Stock.findOneAndUpdate(
      { _id: stock._id },
      { multiplier: multiplier },
      { new: true }
    );
  }
}

// prosperity event
async function prosperityTrigger() {
  // fetch our stocks
  const stocks = await Stock.find({ stockCategory: 'luxury' }).select('-__v');

  // display that an event has triggered
  console.log("The kingdom prospers; the value of luxury goods has skyrocketed!");
  // calculate a multiplier
  const multiplier = Math.round((Math.random() * 3 + 2));

  // update our stock multipliers
  for (const stock of stocks) {
    const updatedStock = await Stock.findOneAndUpdate(
      { _id: stock._id },
      { multiplier: multiplier },
      { new: true }
    );
  }
}

module.exports = [ warTrigger, famineTrigger, prosperityTrigger ];
