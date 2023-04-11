const { body, validationResult } = require('express-validator');
var MSG = require('../configs/notifies');
var handleresult = require('../configs/handleResult');
var util = require('util');

const option = {
    LengthName: { min: 5, max: 250 },
    LengthDescription: { max: 500, min: 5 },
    checkPirce: { isNaN: true },
    LengthImageString: { isEmpty: true },
    checkActive: { isEmpty: true },
    LengthCategory: { max: 250, min: 5 }
}

const Rules = () => {
    return [
        body('name_food').isLength(option.LengthName)
            .withMessage(util.format(MSG.MSG_LENGTH, 'name_food', option.LengthName.min, option.LengthName.max)),
        body('description').isLength(option.LengthDescription)
        .withMessage(util.format(MSG.MSG_LENGTH, 'description', option.LengthDescription.min, option.LengthDescription.max)),
        // body('image_food').isLength(option.LengthImageString)
        // .withMessage(util.format(MSG.MSG_LENGTH, 'image_food', option.LengthImageString.isEmpty)),
        body('price_food').isLength(option.checkPirce)
        .withMessage(util.format(MSG.MSG_NUMBER, 'price_food', option.checkPirce.isNaN)),
        body('isActive').isLength(option.checkActive)
        .withMessage(util.format(MSG.MSG_EMPTY, 'isActive', option.checkActive.isEmpty)),
        body('category').isLength(option.LengthCategory)
        .withMessage(util.format(MSG.MSG_LENGTH, 'isActive',option.LengthCategory.max, option.LengthCategory.min)),
    ]
}

const validate = (req, res, next)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    }
    return  handleresult.showResult(res, 400, false, { errors: errors.array() });
}

module.exports={
    Rules,validate
}