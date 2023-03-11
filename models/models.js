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

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require:true
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
    price_food:{
        type: Number,
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

const billSchema = new mongoose.Schema({
    total_price: {
        type: Number,
        require:true
    },
    quantity: { type: Number, required: true },
    create_date: { type: Date, default: Date.now },
    note: { type: String },
    account:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account"
        },
    discounts: [
        {
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'Discount' }
    ],
    billdetail: [
        {
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'BillDetail' 
        }
    ],
});

const billDetailSchema = new mongoose.Schema({
    Foods: [{
        idfood: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
        namefood:{type: String},
        priceFood: {type:Number},
        quantity: {type: Number}
    }],
    id_bill: { type: mongoose.Schema.Types.ObjectId, ref: 'Bill', required: true },
});

const discountSchema = new mongoose.Schema(
    {
        nae_discount: {
            type: String,
            require: true
        },

        start_date: {
            type: Date,
            require: true,
        },
        
        end_date:{
            type: Date,
            require: true,
        },

        level_discount: {
            type: Number,
            default: 0,
        },
        bills: [{
            
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Bill' 
        }]
    }
);


let Food = mongoose.model("Food", foodSchema);
let Category = mongoose.model("Category", categorySchema);
let Role = mongoose.model("Role", roleSchema);
let Account = mongoose.model("Account", accountSchema);
let Bill = mongoose.model("Bill", billSchema);
let BillDetail = mongoose.model("BillDetail", billDetailSchema);
let Discount = mongoose.model("Discount", discountSchema);

module.exports = {Food, Category, Role, Account, Bill, BillDetail, Discount};