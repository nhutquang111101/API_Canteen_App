const mongoose = require("mongoose");


const roleSchema = new mongoose.Schema({
    name_role:{
        type: String,
        require:true
    },
    account:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    }],
});

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
});

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    foods:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food"
        }
    ],
});

const foodSchema = new mongoose.Schema({
    name_food:{
        type: String,
        require: true,
    },
    price:{
        type: String,
        require: true,
    },
    image_food:{
        type: String,
        require: true,
    },
    category:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }],
});


let Food = mongoose.model("Food", foodSchema);
let Category = mongoose.model("Category", categorySchema);
let Role = mongoose.model("Role", roleSchema);
let Account = mongoose.model("Account", accountSchema);

module.exports = {Food, Category, Role, Account};