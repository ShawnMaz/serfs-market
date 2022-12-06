// import our db
const db = require('../config/connection');
// import our Stock model
const { Stock } = require('../models');

// define our stocks
const stockArray = [
  {
    stockName: "Swords",
    stockDescription: "Sharp and lethal, an instrument of death valuable to any kingdom.",
    stockCategory: "weaponry",
    stockPrice: 175,
    multiplier: 1
  },
  {
    stockName: "Shields",
    stockDescription: "You'd be hard-pressed to find a battle-hardened solider without one.",
    stockCategory: "weaponry",
    stockPrice: 112,
    multiplier: 1
  },
  {
    stockName: "Arrows",
    stockDescription: "Any castle's first line of defense against an army of intruders.",
    stockCategory: "weaponry",
    stockPrice: 78,
    multiplier: 1
  },
  {
    stockName: "Apples",
    stockDescription: "Red, shiny, delicious.",
    stockCategory: "food",
    stockPrice: 60,
    multiplier: 1
  },
  {
    stockName: "Bread",
    stockDescription: "The basis of life.",
    stockCategory: "food",
    stockPrice: 22,
    multiplier: 1
  },
  {
    stockName: "Mead",
    stockDescription: "Necessary for any serf's dinner party.",
    stockCategory: "food",
    stockPrice: 65,
    multiplier: 1
  },
  {
    stockName: "Jewellery",
    stockDescription: "A noble isn't noble without a chain around their neck.",
    stockCategory: "luxury",
    stockPrice: 370,
    multiplier: 1
  },
  {
    stockName: "Silk",
    stockDescription: "Great for capes and charming high-apparel alike.",
    stockCategory: "luxury",
    stockPrice: 245,
    multiplier: 1
  },
  {
    stockName: "Gold",
    stockDescription: "The pumping heart of the medieval economy.",
    stockCategory: "luxury",
    stockPrice: 410,
    multiplier: 1
  }
]

// remove old stocks and add our stocks to the database
async function seedStock() {
  // clear stocks
  const deletedStocks = await Stock.deleteMany();
  console.log(deletedStocks);

  // add our new stocks to the database
  const addedStocks = await Stock.insertMany(stockArray);
  console.log(addedStocks);

  // notify the user that our seeds have been planted
  console.log("Stock database seeded!");
}

// call our function
seedStock();