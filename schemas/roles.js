const mongoose = require('mongoose');
const config = require('../configs/config');

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

module.exports = mongoose.model(config.role_collection, roleSchema);