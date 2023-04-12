const { body, validationResult } = require('express-validator');
var MSG = require('../configs/notify');
var handleresult = require('../configs/handleResult');
var util = require('util');

const option = {
    LengthName: { min: 5, max: 250 },
    checkActive: { isEmpty: true },
}

const Rules = () => {
    return [
        body('name_cate').isLength(option.LengthName)
            .withMessage(util.format(MSG.MSG_LENGTH, 'name_cate', option.LengthName.min, option.LengthName.max)),
        body('isActive').isLength(option.checkActive)
        .withMessage(util.format(MSG.MSG_EMPTY, 'isActive', option.checkActive.isEmpty)),
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