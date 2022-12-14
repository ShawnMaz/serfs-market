const {Schema, model} = require('mongoose');
const stockEntrySchema = require('./StockEntry');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        username:{
            type:String,
            required: true,
            unique: true,
            trim: true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            match:[/.+@.+\..+/, 'Must match an email address!']
        },
        password:{
            type: String,
            required:true,
            minLength:8
        },
        money:{
            type: Number,
            required: true,
            default: 1000.00
        },
        portfolio:[stockEntrySchema]
    }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;