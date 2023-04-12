let mongoose = require('mongoose');
let configs = require('../configs/config');
let cartSchema = new mongoose.Schema({
    // _id: String,
    customer_id: mongoose.Types.ObjectId,
    foodId: mongoose.Types.ObjectId,
    name_food: String,
    price_food: Number,
    image_food: String,
    quantity: Number,
    isActive: Boolean
});
module.exports = mongoose.model(configs.cart_collection, cartSchema);