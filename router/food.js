<<<<<<< HEAD
const foodController = require("../controller/foodController");
const upload = require("../middleware/upload");

const router = require("express").Router();

//Add a Book
router.post("/addfood",upload.single('image_food'), foodController.addFood);
// order food
router.post("/order", foodController.orderFood);

// //get a book
// router.get("/:id", bookController.getABook);

// //update  book
// router.put("/:id", bookController.updateBook);

// //delete  book
// router.delete("/:id", bookController.deleteBook);
=======
const express = require('express');
const router = express.Router();
>>>>>>> dev-phminhco

module.exports = router;