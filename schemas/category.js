const mongoose = require('mongoose');
const config = require('../configs/config');

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

module.exports = mongoose.model(config.category_collection, categorySchema);