const mongoose = require('mongoose');
const config = require('../configs/config');

const billDetailSchema = new mongoose.Schema({
    Foods: [{
        idFood: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
        nameFood:{type: String},
        priceFood: {type:Number},
        quantity: {type: Number}
    }],
    id_bill: { type: mongoose.Schema.Types.ObjectId, ref: 'Bill', required: true },
});

module.exports = mongoose.model(config.billDetail_collection, billDetailSchema);