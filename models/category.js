const category = require('../schemas/category');


module.exports = {
    addCate: async (item)=>{
      var newItem = new category(item);
      if(newItem){
        console.log("Them Thanh Cong");
      }
      else{
        console.log("Khong them do");
      }
      return (newItem).save();
  },

  getAllcate:async ()=>{
    return await category.find({}).exec();
  },
  getcateIsActive:async ()=>{
    return await category.find({isActive: true}).exec();
  },

  getCategoryById:async (id)=>{
    return await category.findById(id).exec();
  },

  editAnCategory: async (params)=>{// params.id params.update
    return await category.findByIdAndUpdate(params.id,params.update,{new:true});
  },
  
  deleteAnCategory: async (params)=>{// params.id params.update
    return await category.findByIdAndUpdate(params.id,params.update,{new:true});
  },

  deleteCategoryInTrash:async(id)=>{
    return await category.findByIdAndDelete(id);
  }
};