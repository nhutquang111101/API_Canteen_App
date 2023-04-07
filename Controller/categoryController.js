const {Category, Food } = require("../models/models");

const categoryController = {

     addCategory: async(req, res)=>{
        try{
            console.log("vao Server");
            const newCate = new Category(req.body);
            console.log(newCate);
            const saveCategory = await newCate.save();
            res.status(200).json(saveCategory);
        }catch(err){
            res.status(500).json(err);
            console.log(""+err);
        }
        // res.status(200).json(req.body);
    },

    //get all author controller
    getAllCategory: async(req, res)=>{
        try{
            const categorys = await Category.find();
            res.status(200).json(categorys);
        }
        catch(err){
            res.status(500).json(err);
        }
    },


};

module.exports = categoryController;