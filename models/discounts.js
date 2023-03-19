const mongoose = require('mongoose');
const config = require('../configs/config');

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

module.exports = mongoose.model(config.discount_collection, discountSchema);