const mongoose = require('mongoose');
const config = require('../configs/config');

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

module.exports = mongoose.model(config.bill_collection, billSchema);