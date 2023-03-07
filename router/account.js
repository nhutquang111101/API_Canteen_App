const express = require('express');
const router = express.Router();
const accountController = require('../controller/accountController');

// Đăng ký tài khoản
router.post('/', accountController.signup);

// Xác thực OTP
router.post('/verify', accountController.confirmotp);

module.exports = router;