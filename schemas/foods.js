let mongoose = require('mongoose');
let configs = require('../configs/config');
let foodSchema = new mongoose.Schema({
    // _id: String,
    name_food: String,
    description: String,
    price_food: Number,
    image_food: String,
    isActive: Boolean,
    category : String,
});
module.exports = mongoose.model(configs.food_collection, foodSchema);