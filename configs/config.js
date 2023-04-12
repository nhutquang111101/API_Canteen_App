const dotenv = require("dotenv");
dotenv.config();

module.exports={
    HOST:'http://127.0.0.1:3000/',
    DBURL:(process.env.MONGODB_URL),
    account_collection:'Account',
    food_collection:'Food',
    role_collection: 'Role',
    category_collection:'Category',
    cart_collection: 'Cart',
    bill_collection:'Bill',
    billDetail_collection:'BillDetail',
    discount_collection:'Discount',
    saltRounds:10,
    JWT_SECRET: (process.env.JWT_SECRET),
    JWT_EXPIRE: (process.env.JWT_EXPIRE),
    COOKIE_EXPIRE:(process.env.COOKIE_EXPIRE),
    SMTP_Host:(process.env.SMTP_Host),
    SMTP_Port:(process.env.SMTP_Port),
    SMTP_Username:(process.env.SMTP_Username),
    SMTP_Password:(process.env.SMTP_Password),
    role: ['64060b49eb16c61cca11b04e','64060bc2eb16c61cca11b050'],
    role_admin: '64060b49eb16c61cca11b04e',
    role_user: '64060bc2eb16c61cca11b050',
    // SMTP_Auth:'PLAIN, LOGIN and CRAM-MD5',
    // SMTP_TLS:'Optional (STARTTLS on all ports)',
}