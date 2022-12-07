const { Schema, model } = require('mongoose');
// import our date helper
const { formatDate } = require('../utils/dateFormat');

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
      default: Date.now,
      get: formatDate
    }
  }
);

const News = model('News', newsSchema);
module.exports = News;
