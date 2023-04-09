const {roles} = require("../models");
const router = require("express").Router();



//add author
router.post("/", roles.addRole);

router.get("/", roles.getAllRole);

module.exports = router;
