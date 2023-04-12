var express = require('express');
var router = express.Router();
var models = require('../models/carts');
var handleresult = require('../configs/handleResult');
const protectMiddleware = require('../middleware/protect');
const config = require('../configs/config');
var {Rules,validate} = require('../validator/foods');
// const session = require('express-session');

router.post('/add', protectMiddleware.protect, protectMiddleware.authorize(config.role_user), async function(req, res, next) {
    try {
        var body = req.body;
        console.log(body)
        var list = await models.addtocart(req.body);
        handleresult.showResult(res, 200, true, list);
    } catch (error) {
        handleresult.showResult(res, 400, false, error);
    }
});

router.put('/edit/:id', protectMiddleware.protect, protectMiddleware.authorize(config.role_user), async function (req, res, next) {
    try {
        console.log(req.body);
      var item = await models.editCart({id:req.params.id,update:req.body});
      handleresult.showResult(res,200,true,item);
    } catch (error) {
      handleresult.showResult(res,400,false,error);
    }    
  });
  

  router.get('/cus/:id', protectMiddleware.protect, protectMiddleware.authorize(config.role_user),async function (req, res, next) {
    try {
      var food = await models.getByCusId(req.params.id);
      handleresult.showResult(res,200,true,food);
    } catch (error) {
      handleresult.showResult(res,400,false,error);
    }
  });

  router.get('/',protectMiddleware.protect,protectMiddleware.authorize(config.role_user), async function (req, res, next) {
    try {
      var cates = await models.getcartIsActive();
      handleresult.showResult(res,200,true,cates);
    } catch (error) {
      handleresult.showResult(res,400,false,error);
    }
  
  });

router.get('/:id',protectMiddleware.protect, protectMiddleware.authorize(config.role_user), async function(req, res, next) {
    let ID = req.params.id;
    try {
        var list = await models.getByCusId(ID);
        ShowResult.returnResult(res, 200, true, list);
    } catch (error) {
        ShowResult.returnResult(res, 400, false, error);
    }
});
router.put('/delete/:id',protectMiddleware.protect, protectMiddleware.authorize(config.role_user), async function(req, res, next) {
  // let ID = req.params.id;
  try {
      var list = await models.deleteAnCart({id:req.params.id,update:req.body});
      ShowResult.returnResult(res, 200, true, list);
  } catch (error) {
      ShowResult.returnResult(res, 400, false, error);
  }
});

router.delete('/deleteintrash/:id',protectMiddleware.protect, protectMiddleware.authorize(config.role_user), async function (req, res, next) {
  try {
    var item = await models.deleteCartInTrash(req.params.id);
    handleresult.showResult(res,200,true,item);
  } catch (error) {
    handleresult.showResult(res,400,false,error);
  }    
});

module.exports = router;