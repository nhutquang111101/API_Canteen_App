const {Role, Account, } = require("../models/models");

const roleController = {

     //Add Role
     addRole: async(req, res)=>{
        try{
            console.log("vao Server");
            const newRole = new Role(req.body);
            console.log(newRole);
            const saveRole = await newRole.save();
            res.status(200).json(saveRole);
        }catch(err){
            res.status(500).json(err);
            console.log(""+err);
        }
        // res.status(200).json(req.body);
    },

    //get all author controller
    getAllRole: async(req, res)=>{
        try{
            const roles = await Role.find();
            res.status(200).json(roles);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    // //get an author
    // getAnAuthor: async(req, res)=>{
    //     try{
    //         const authors = await Author.findById(req.params.id).populate("books");
    //         res.status(200).json(authors);
    //     }
    //     catch(err){
    //         res.status(500).json(err);
    //     }
    // },

    //  //update author
    //  updateAuthor: async(req, res)=>{
    //     try{
    //         const author = await Author.findById(req.params.id);
    //         await author.updateOne({$set: req.body });
    //         res.status(200).json("Update Successfully!");
    //     }
    //     catch(err){
    //         res.status(500).json(err);
    //     }
    // },

    //  //delete author
    //  deleteAuthor: async(req, res)=>{
    //     try{
    //        await Book.updateMany({author: req.params.id}, {author: null});
    //        await Author.findByIdAndDelete(req.params.id);
    //         res.status(200).json("Delete Successfully!");
    //     }
    //     catch(err){
    //         res.status(500).json(err);
    //     }
    // },
};

module.exports = roleController;