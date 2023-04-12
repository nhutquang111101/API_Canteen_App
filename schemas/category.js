let mongoose = require('mongoose');
let configs = require('../configs/config');
let cateSchema = new mongoose.Schema({
    // _id: String,
    name_cate: String,
    isActive: Boolean
});
module.exports = mongoose.model(configs.category_collection, cateSchema);