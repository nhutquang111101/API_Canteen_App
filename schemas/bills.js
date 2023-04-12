const mongoose = require('mongoose');
const config = require('../configs/config');

const billSchema = new mongoose.Schema({
   total_price: Number,
   account_id: mongoose.Types.ObjectId,
   date_order:String,
   isActive: Boolean
});

module.exports = mongoose.model(config.bill_collection, billSchema);