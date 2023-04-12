var handleResult = require('../configs/handleResult');
var config = require('../configs/config');
var jwt = require('jsonwebtoken');
var {accounts} = require('../models');

module.exports = {
    protect: async (req, res, next) => {
        let token = '';
        if (req.headers.authorization) {
            if (req.headers.authorization.startsWith('bearer'))
                token = req.headers.authorization.split(' ')[1];
        }        
        else if (req.cookies) {
            if (req.cookies.token)
                token = req.cookies.token;
        }
        if (token === 'none' || !token) {
            return handleResult.showResult(res, 400, false, 'Vui long dang nhap');
        }

        try {
            const decode = jwt.verify(token, config.JWT_SECRET);
            console.log(decode);
            req.account = await accounts.getAccountById(decode.id);
            next();
        } catch (error) {
            return handleResult.showResult(res, 200, false, error);
        }
    },
    authorize: (...role) => {
        return (req, res, next)=>{ 
            if(!role.includes(req.account.role.toString())){
                return handleResult.showResult(res, 400, false, 'Ban khong co quyen truy cap');
            }
            if(!req.account.isActive){
                return handleResult.showResult(res, 400, false, 'Tai khoan khong ton tai');
            }
            next();
        }
    }
}