const {foods} = require("../models");
const upload = require("../middleware/upload");

const router = require("express").Router();

//Add a Book
router.post("/addfood",upload.single('image_food'), foods.addFood);
// order food
router.post("/order", foods.orderFood);

// //get a book
// router.get("/:id", bookController.getABook);

// //update  book
// router.put("/:id", bookController.updateBook);

// //delete  book
// router.delete("/:id", bookController.deleteBook);

module.exports = router;