// define our events
// import our models
const { Stock } = require('../../../models');

// wartime event
async function warTrigger() {
  // fetch our stocks
  const stocks = await Stock.find().select('-__v');

  // how many stocks are we modifying?

}

// famine event
async function famine() {
  const stocks = await Stock.find().select('-__v');
}

module.exports = { warTrigger };
