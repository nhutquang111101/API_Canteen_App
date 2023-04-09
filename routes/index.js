const path = require("path");
const authRoute =  require("./auth");
const roleRoute =  require("./role");
const categoryRoute =  require("./category");
const foodRoute =  require("./food");
const billRoute =  require("./bill");

var express = require('express');
var router = express.Router();

router.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);
router.use("/auth", authRoute);
router.use("/role", roleRoute);
router.use("/category", categoryRoute);
router.use("/food", foodRoute);
router.use("/bill", billRoute);


module.exports = router;