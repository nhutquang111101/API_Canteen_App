const path = require("path");
var express = require('express');
var router = express.Router();

// router.use("/uploads", express.static(path.join(__dirname, "uploads")));
router.use('/auth',require('./auth'));


module.exports = router;