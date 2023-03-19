const mongoose = require('mongoose');
const config =  require('../configs/config');

const accountSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    fullname:{
        type: String,
        require: true
    },
    phone:{
        type: String,
        require: true
    },
    amount:{
        type: Number,
        default:1000000,
        require: true
    },
    isVerified: { 
        type: Boolean, 
        default: false
     },
    verificationCode: { 
        type: String,
         default: null 
    },
    role:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    }],
    bills:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bill"
    }]
});

module.exports = mongoose.model(config.account_collection,accountSchema);