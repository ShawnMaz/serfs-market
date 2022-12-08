const {Schema, model} = require('mongoose');

const stockSchema = new Schema(
    {
        stockName:{
            type:String,
            required:true,
            minLength:1,
            maxLength:30            
        },
        stockDescription:{
            type:String,
            required:true,
            minLength:1,
            maxLength:300
        },
        stockCategory:{
            type:String,
            required:true,
            minLength:1,
            maxLength:300
        },
        stockPrice:{
            type:Number,
            required:true
        },
        // multiplier for events
        multiplier:{
            type:Number,
            required:true,
            default:1
        }
    }
);

const Stock = model('Stock', stockSchema);
module.exports = Stock;
