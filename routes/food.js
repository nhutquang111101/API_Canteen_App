var models = require('../models/foods');
const upload = require("../middleware/upload");
var handleresult = require('../configs/handleResult');
var {Rules,validate} = require('../validator/foods');
const router = require("express").Router();

//Add a Book
router.post('/addfood',  upload.single('image_food'), Rules(),validate, async function (req, res, next) {
    try {
        const itemFood = req.body;
        if (req.file) {
            itemFood.image_food = req.file.path;
        }
        const item = await models.addFood(itemFood);
        handleresult.showResult(res, 200, true, item);
    } catch (error) {
        handleresult.showResult(res, 400, false, error);
    }
});

router.get('/allfoods', async function (req, res, next) {
    try {
      var foods = await models.getAllFood();
      handleresult.showResult(res,200,true,foods);
    } catch (error) {
      handleresult.showResult(res,400,false,error);
    }
  
  });

  router.get('/:id',async function (req, res, next) {
    try {
      var food = await models.getFoodById(req.params.id);
      handleresult.showResult(res,200,true,food);
    } catch (error) {
      handleresult.showResult(res,400,false,error);
    }
  });

  router.get('/getfoodbycate/:id',async function (req, res, next) {
    try {
      var food = await models.getFoodByCategory(req.params.id);
      handleresult.showResult(res,200,true,food);
    } catch (error) {
      handleresult.showResult(res,400,false,error);
    }
  });

  router.put('/edit/:id',upload.single('image_food'), Rules(),validate, async function (req, res, next) {
    try {
        const itemFood = req.body;
        if (req.file) {
            itemFood.image_food = req.file.path;
        }
        console.log("Id Của Món ăn Sửa  "+req.params.id);
      var food = await models.editAnFood({id:req.params.id,update:itemFood});
      if(food){
        console.log("sua");
      }
      else{
        console.log("ko sua");
      }
      handleresult.showResult(res,200,true,food);
    } catch (error) {
      handleresult.showResult(res,400,false,error);
    }    
  });
  
  router.put('/delete/:id',upload.single('image_food'), Rules(),validate,async function (req, res, next) {
    try {
      const itemFood = req.body;
      if (req.file) {
          itemFood.image_food = req.file.path;
      }
      console.log("Id Của Món ăn Sửa  "+req.params.id);
    var food = await models.deleteAnFood({id:req.params.id,update:itemFood});
    if(food){
      console.log("sua");
    }
    else{
      console.log("ko sua");
    }
    handleresult.showResult(res,200,true,food);
  } catch (error) {
    handleresult.showResult(res,400,false,error);
  }    
  });

  router.delete('/deleteintrash/:id',async function (req, res, next) {
    try {
      var item = await models.deleteFoodInTrash(req.params.id);
      handleresult.showResult(res,200,true,item);
    } catch (error) {
      handleresult.showResult(res,400,false,error);
    }    
  });

module.exports = router;