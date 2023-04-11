const { body, validationResult } = require('express-validator');
var MSG = require('../configs/notify');
var handleResult = require('../configs/handleResult');
var util = require('util');

const option = {
    LengthName: { min: 5, max: 40 },
    StrongPassword:{
        minLength:8,
        minUppercase:1,
        minLowercase:1,
        minNumbers:1,
        minSymbols:1
    }
}

const Rules = () => {
    return [
        body('email').isEmail().withMessage(MSG.MSG_EMAIL),
        body('password').isStrongPassword(option.StrongPassword).withMessage(util.format(MSG.MSG_PASSWORD,option.StrongPassword.minLength,option.StrongPassword.minUppercase,option.StrongPassword.minLowercase,option.StrongPassword.minNumbers,option.StrongPassword.minSymbols))
    ]
}

const validate = (req, res, next)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    }
    return  handleResult.showResult(res, 400, false, { errors: errors.array() });
}

module.exports={ Rules,validate }