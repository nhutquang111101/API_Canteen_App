var express = require('express');
var router = express.Router();
var handleResult = require('../configs/handleResult');
const protectMiddleware = require('../middleware/protect');
const config = require('../configs/config');
const {roles}  = require('../models');

// router.get('/', function(req, res) {
//     res.render('indexTpl', {title: 'Express', year: new Date().getFullYear()},            
//        function(err, html) {
//          // ...
//        });
//   });
//add author
router.post("/add", protectMiddleware.protect,protectMiddleware.authorize(config.role_admin),
 async (req, res, next) => {
    try{
        var newRole = await roles.addRole(req.body);
        handleResult.showResult(res, 200, true, newRole);
    }catch(err){
        handleResult.showResult(res, 400, false, err);
    }
});

router.get("/", protectMiddleware.protect,protectMiddleware.authorize(...config.role),
 async (req, res, next) => {
    try{
        const role = await roles.getAllRole();
        handleResult.showResult(res, 200, true, role);
    }
    catch(err){
        handleResult.showResult(res, 400, false, err);
    }
});

router.get("/:id", protectMiddleware.protect,protectMiddleware.authorize(...config.role),
 async (req, res, next) => {
    try{
        const role = await roles.getRoleById(req.params.id);
        handleResult.showResult(res, 200, true, role);
    }
    catch(err){
        handleResult.showResult(res, 400, false, err);
    }
});

module.exports = router;
