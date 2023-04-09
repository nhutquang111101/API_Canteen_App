const mongoose = require('mongoose');
const config = require('../configs/config');

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

module.exports = mongoose.model(config.food_collection, foodSchema);