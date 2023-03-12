const categoryController = require("../controller/categoryController");
const router = require("express").Router();



//add author
router.post("/addcategory", categoryController.addCategory);

router.get("/getallcategory", categoryController.getAllCategory);

module.exports = router;
