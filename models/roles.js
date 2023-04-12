const {Role, Account, } = require("../schemas");


const roles = {
     addRole: async(item) => {
        let tmp = {name_role: item.name_role, isActive: true};
        return await (new Role(tmp)).save();
    },
    getAllRole: async() => {
        return await Role.find({}).exec();
    },
    getRoleById: async (id) => {
        return await Role.findById(id).exec();
    }
};

module.exports = roles;