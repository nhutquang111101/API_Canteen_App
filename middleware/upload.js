const multer = require("multer");
const path = require("path");

var storate = multer .diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        let ext = path.extname(file.originalname);
        cb(null, Date.now()+ext);
    }
});

var upload = multer({
    storage: storate,
    fileFilter: function(req, file, callback){
        if(
            file.mimetype == "image/jpeg" || 
            file.mimetype == "image/png"
        ){
            callback(null, true);
        }else{
            console.log('chỉ cho phép file png và jpg');
            callback(null, false);
        }
    },
    limits:{
        fileSize: 1024 * 1024 *2,
    },
});
module.exports = upload;