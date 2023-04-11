var express = require('express');
var router = express.Router();
var accountModel = require('../models/account');
var handleResult = require('../configs/handleResult');
var {Rules,validate} = require('../validator/account');
const protectMiddleware = require('../middleware/protect');
const config = require('../configs/config');

router.get('/', protectMiddleware.protect,protectMiddleware.authorize(...config.role),
async function (req, res, next) {
    try {
      var accounts = await accountModel.getAllAccount();
      handleResult.showResult(res, 200, true, accounts);
    } catch (error) {
        handleResult.showResult(res, 400, false, error);
    }
});

router.get('/active', protectMiddleware.protect,protectMiddleware.authorize(...config.role),
 async function (req, res, next) {
    try {
        var accounts = await accountModel.getAllAccountActive();
        handleResult.showResult(res, 200, true, accounts);
    } catch (error) {
        handleResult.showResult(res, 400, false, error);
    }
});

router.get('/:id', protectMiddleware.protect,protectMiddleware.authorize(...config.role),
 async function (req, res, next) {
    try {
      var account = await accountModel.getAccountById(req.params.id);
      handleResult.showResult(res, 200, true, account);
    } catch (error) {
        handleResult.showResult(res, 400, false, error);
    }
});

//Only users have permission to modify their account's information.
router.put('/edit/:id', protectMiddleware.protect,protectMiddleware.authorize(config.role_user),
 async function (req, res, next) {
    try {
        if (req.body.isActive) {
            delete req.body.isActive;
        }
        var account = await accountModel.editAccount({ id: req.params.id, update: req.body });
        handleResult.showResult(res, 200, true, account);
    } catch (error) {
        handleResult.showResult(res, 400, false, error);
    }
});

//Only users have permission to delete their accounts.
router.delete('/delete/:mail', protectMiddleware.protect,protectMiddleware.authorize(config.role_user),
 async function (req, res, next) {
    try {
        console.log(req.params.mail)
        var account = await accountModel.deleteAccountByEmail(req.params.mail);
        handleResult.showResult(res, 200, true, account);
    } catch (error) {
        handleResult.showResult(res, 400, false, error);
    }
});

module.exports = router;