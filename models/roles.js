const {Role, Account, } = require("../schemas");


const roles = {
     addRole: async(item) => {
        return await (new Role(item.body)).save();
    },
    getAllRole: async() => {
        return await Role.find({}).exec();
    },
    getRoleById: async (id) => {
        return await Role.findById(id).exec();
    }
};

module.exports = roles;