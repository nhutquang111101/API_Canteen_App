const roleController = require("../controller/roleController");
const router = require("express").Router();



//add author
router.post("/", roleController.addRole);

router.get("/", roleController.getAllRole);

module.exports = router;
