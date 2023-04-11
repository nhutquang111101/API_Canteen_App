const express = require('express');
const router = express.Router();
const {auth} = require('../models');
const handleResult = require('../configs/handleResult');
const { Rules, validate } = require('../validator/auth');
const { PassRules, PassValidate, PassUpdateRules } = require('../validator/password');
const protectMiddleware = require('../middleware/protect');
const configs = require('../configs/config');

// Đăng ký tài khoản
router.post('/register', Rules(), validate, async (req, res, next) => {
    try {
        const register = await auth.signup(req.body);
        if (!register) {
            handleResult.showResult(res, 400, false, {data: 'Đăng ký thất bại!'});
        }
        else if (register.error) {
            handleResult.showResult(res,400,false, {data: register.error});
        }
        else handleResult.showResult(res,200,true, {data: 'Vui lòng xác thực'});
    } catch (error) {
        handleResult.showResult(res,400,false, error);
    }

});

// Xác thực OTP
router.post('/verify/:otp', async (req, res, next) => {
    try {
        const account = await auth.confirmOTP(req.params.otp);
        if (!account) {
            handleResult.showResult(res, 400, false, {data: "Ma OTP khong dung"});
        } else
            handleResult.showResult(res, 200, true, {data: "Xac thuc thanh cong"});
    } catch (error) {
        handleResult.showResult(res, 400, false, error);
    }
});

//login
router.post('/login', async (req,res,next) => {
    try {
        var result = await auth.login(req.body);
        if (!result.error && result) {
          saveCookieResponse(res, 200, result);          
        }
        else if (!result) {
          console.log(result)
          handleResult.showResult(res, 401, false, 'Tai khoan chua xac thuc');
        }
        else {
          handleResult.showResult(res, 400, false, result.error);
        }
      } catch (error) {
        handleResult.showResult(res, 400, false, error);
      }
});

router.get('/logout', async function (req, res, next) {
  try {
    const option = {
      expirers: new Date(Date.now() + 1000),
      httpOnly: true
    }
    res.status(200).cookie('token', 'none', option).json({
      success: true,
      data: {}
    })
  } catch (error) {
    handleResult.showResult(res, 400, false, error);
  }
});

router.post('/forgot-password',
  async function (req, res, next) {
    try {
      const result = await auth.ForgotPassword(req.body);
      if(!result){
        handleResult.showResult(res, 200, false, {data: "email khong ton tai"});
      } else 
          handleResult.showResult(res, 200, true, {data: result});
    } catch (error) {
      handleResult.showResult(res, 400, false, error);
    }
});

router.post('/reset-password/:resetToken',PassRules(),PassValidate,
  async function (req, res, next) {
    try {
      const user = await auth.Resetpassword({resetToken:req.params.resetToken,password:req.body.password});
      if(!user){
        handleResult.showResult(res, 400, false, {data: "code het han"});
      }
      handleResult.showResult(res, 200, true, {data: "thanh cong"});
    } catch (error) {
      handleResult.showResult(res, 400, false, error);
    }
});

router.post('/update-password', protectMiddleware.protect,protectMiddleware.authorize(configs.role_user),
PassUpdateRules(), PassValidate, async (req,res,next) => {
    try {
      const account = await auth.updatePass({account: req.account,newPassword: req.body.newPassword, oldPassword: req.body.oldPassword});
      if(!account){
        handleResult.showResult(res, 400, false, {data: "Vui long kiem tra lai mat khau"});
      } else 
        handleResult.showResult(res, 200, true, {data: "thay doi thanh cong"});
    } catch (error) {
        handleResult.showResult(res, 400, false, error);
    }
});

module.exports = router;
function saveCookieResponse(res, StatusCode, token) {
    const option = {
      expirers: new Date(Date.now() + configs.COOKIE_EXPIRE * 24 * 3600 * 1000),
      httpOnly: true
    }
    res.status(StatusCode).cookie('token', token, option).json({
      success: true,
      data: token
    })
  }