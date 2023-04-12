const Food = require('../schemas/foods');


module.exports = {
    addFood: async (item)=>{

      var food = new Food(item);
      return (food).save();
  },

  getAllFood:async ()=>{
    return await Food.find({}).exec();
  },

  getFoodIsActive:async ()=>{
    return await Food.find({isActive: true}).exec();
  },

  getFoodById:async (id)=>{
    return await Food.findById(id).exec();
  },

  getFoodByCategory: async(id)=>{

    // var newFood = new Food(id);
    // var list = newFood.category.findById(id);
    return await Food.find({
      category: id
    }).exec();
  },

  editAnFood: async (params)=>{// params.id params.update
    return await Food.findByIdAndUpdate(params.id,params.update,{new:true});
  },
  
  deleteAnFood: async (params)=>{// params.id params.update
    return await Food.findByIdAndUpdate(params.id,params.update,{new:true});
  },

  deleteFoodInTrash:async(id)=>{
    return await Food.findByIdAndDelete(id);
  }
};