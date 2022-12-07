const { Schema, model } = require('mongoose');

const newsSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true
    },
    eventDescription: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
);

const News = model('News', newsSchema);
module.exports = Stock;
