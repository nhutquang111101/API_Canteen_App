const express = require('express');
const router = express.Router();
const {auth} = require('../models');

// Đăng ký tài khoản
router.post('/', auth.signup);

// Xác thực OTP
router.post('/verify', auth.confirmotp);

//login
router.post('/login', auth.login);

module.exports = router; 