var schema = require('../schemas/users');

module.exports={
    getAllItem:async ()=>{
        return await schema.find({}).exec();
    },
    getItemById:async (id)=>{
        return await schema.findById(id).exec();
    },
    addAnItem: async (item)=>{
        return (new schema(item)).save();
    },
    editAnItem: async (params)=>{// params.id params.update
        const user  = await schema.findById(params.id).exec();
        const userNew = await user.UpdateNew(params.update);
        await schema.updateOne({_id:params.id},userNew);
        return userNew;
    },
    deleteAnItem:async(id)=>{
        return await schema.findByIdAndDelete(id);
    }
}