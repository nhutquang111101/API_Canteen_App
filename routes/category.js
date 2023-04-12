var models = require('../models/category');
var handleresult = require('../configs/handleResult');
var {Rules,validate} = require('../validator/categories');
const protectMiddleware = require('../middleware/protect');
const config = require('../configs/config');
const router = require("express").Router();



//add cate
router.post('/addcate', protectMiddleware.protect, protectMiddleware.authorize(config.role_admin),  Rules(),validate, async function (req, res, next) {
  try {
      const itemCategory = req.body;
      const item = await models.addCate(itemCategory);
      handleresult.showResult(res, 200, true, item);
  } catch (error) {
      handleresult.showResult(res, 400, false, error);
  }
});

router.get('/allcate',protectMiddleware.protect,protectMiddleware.authorize(config.role_admin), async function (req, res, next) {
  try {
    var cates = await models.getcateIsActive();
    handleresult.showResult(res,200,true,cates);
  } catch (error) {
    handleresult.showResult(res,400,false,error);
  }

});

router.get('/:id', protectMiddleware.protect,protectMiddleware.authorize(config.role_admin), async function (req, res, next) {
  try {
    var food = await models.getCategoryById(req.params.id);
    handleresult.showResult(res,200,true,food);
  } catch (error) {
    handleresult.showResult(res,400,false,error);
  }
});

router.put('/edit/:id', protectMiddleware.protect,protectMiddleware.authorize(config.role_admin), Rules(),validate,async function (req, res, next) {
  try {
    var item = await models.editAnCategory({id:req.params.id,update:req.body});
    console.log(req.body);
    handleresult.showResult(res,200,true,item);
  } catch (error) {
    handleresult.showResult(res,400,false,error);
  }    
});
router.put('/deletecate/:id',protectMiddleware.protect, protectMiddleware.authorize(config.role_admin), Rules(),validate,async function (req, res, next) {
  try {
    var item = await models.deleteAnCategory({id:req.params.id,update:req.body});
    handleresult.showResult(res,200,true,item);
  } catch (error) {
    handleresult.showResult(res,400,false,error);
  }    
});

router.delete('/deleteintrash/:id',protectMiddleware.protect, protectMiddleware.authorize(config.role_admin), async function (req, res, next) {
  try {
    var item = await models.deleteCategoryInTrash(req.params.id);
    handleresult.showResult(res,200,true,item);
  } catch (error) {
    handleresult.showResult(res,400,false,error);
  }    
});

module.exports = router;
