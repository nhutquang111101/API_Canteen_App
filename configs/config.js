const dotenv = require("dotenv");
dotenv.config();

module.exports={
    DBURL:(process.env.MONGODB_URL),
    account_collection:'Account',
    food_collection:'Food',
    role_collection: 'Role',
    category_collection:'Category',
    bill_collection:'Bill',
    billDetail_collection:'BillDetail',
    discount_collection:'Discount',
    // JWT_SECRET:'123456ehehe',
    // JWT_EXPIRE:'3d',
    // COOKIE_EXPIRE:'30'
}