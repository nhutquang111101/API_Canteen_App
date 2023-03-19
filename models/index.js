const Food = require('./foods');
const Category = require('./category');
const Role = require('./roles');
const Account = require('./accounts');
const Bill = require('./bills');
const BillDetail = require('./billDetails');
const Discount = require('./discounts');

module.exports = {Food, Category, Role, Account, Bill, BillDetail, Discount};














const Discount = mongoose.model("Discount", discountSchema);

module.exports = {Food, Category, Role, Account, Bill, BillDetail, Discount};