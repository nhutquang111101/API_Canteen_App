const accountSchema = require('../schemas/accounts');
var handleResult = require('../configs/handleResult');

const accounts = {
    getAccountById: async(id) => {
        return await accountSchema.findById(id).exec();
    },
    getAccountByEmail: async(mail) => {
        return await accountSchema.findOne({email: mail}).exec();
    },
    getAllAccount: async() => {
        return await accountSchema.find({}).exec();
    },
    getAllAccountActive: async() => {
        return await accountSchema.find({isActive: true}).exec();
    },
    editAccount: async (params) => {
        // const acc = await accountSchema.findById(params.id);
        // return await accountSchema.updateOne({_id: params.id}, {$set: params.update});
        return await accountSchema.findByIdAndUpdate(params.id, params.update, {new: true});
    },
    deleteAccountById: async (id) => {
        return await accountSchema.updateOne({_id: id},{$set: {isActive: false}});
    },
    deleteAccountByEmail: async (mail) => {
        return await accountSchema.updateOne({email: mail}, {$set: {isActive: false}});
    }
};

module.exports = accounts;

