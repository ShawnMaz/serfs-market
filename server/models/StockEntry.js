const {Schema} = require('mongoose');

const stockEntrySchema = new Schema(
    {
        stockId:{
            type:Schema.Types.ObjectId,
            ref:'Stock',
            required:true,
        },
        quantity:{
            type: Number,
            required:true,
            set:num => Math.round(num)
        },
        stockName:{
            type: String,
            required:true
        }
    }
);

module.exports = stockEntrySchema;
