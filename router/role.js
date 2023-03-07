const roleController = require("../controller/roleController");
const router = require("express").Router();



//add author
router.post("/", roleController.addRole);

module.exports = router;
