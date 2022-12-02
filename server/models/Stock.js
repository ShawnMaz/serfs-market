const {Schema, model} = require('mongoose');

const stockSchema = new Schema(
    {
        stockName:{
            type:String,
            required:true,
            minlegth:1,
            maxlength:30            
        },
        stockDescription:{
            type:String,
            required:true,
            minlegth:1,
            maxlength:300
        },
        stockPrice:{
            type:Number,
            required:true
        }
    }
);

const Stock = model('Stock', stockSchema);
module.exports = Stock;