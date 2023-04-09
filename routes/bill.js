const {bills} = require("../models");

const router = require("express").Router();


// in hoa don
router.get('/:id', bills.printBill);


module.exports = router;