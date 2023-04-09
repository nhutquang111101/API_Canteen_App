const {category} = require("../models");
const router = require("express").Router();



//add author
router.post("/addcate", category.addCategory);

router.get("/getallcate", category.getAllCategory);

module.exports = router;
