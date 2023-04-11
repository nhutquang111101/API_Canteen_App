const mongoose = require('mongoose');
const config =  require('../configs/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const accountSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    resetPassToken:{
        type: String,
        default: undefined,
        require: true,
    },
    resetPassTokenExp:{
        type: String,
        default: undefined,
        require: true,
    },
    fullName:{
        type: String,
        require: true
    },
    phone:{
        type: String,
        require: true
    },
    amount:{
        type: Number,
        default:1000000,
        require: true
    },
    isVerified: { 
        type: Boolean, 
        default: false
     },
    verificationCode: { 
        type: String,
        default: null 
    },
    role:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    }],
    bills:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bill"
    }],
    isActive: {
        type: Boolean,
        default: true
    }
});

accountSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        next();
    } else {
        const salt = bcrypt.genSaltSync(config.saltRounds);
        this.password = bcrypt.hashSync(this.password, salt);
        next();
    }
});

accountSchema.methods.getSignedJWT = function () {
    return jwt.sign({id: this._id}, config.JWT_SECRET, {expiresIn: config.JWT_EXPIRE});
}

// accountSchema.methods.updateNewPass =  async function (userNew) {
//     let isMatch = await bcrypt.compare(userNew.oldPassword, this.password);
//     if (isMatch) {
//         const salt = bcrypt.genSaltSync(config.saltRounds);
//         this.password = bcrypt.hashSync(userNew.password, salt);
//         return userNew;
//     }
//     return false;

// }

accountSchema.methods.resetPassword = function () {
    // const resetToken = crypto.randomBytes(20).toString('hex');
    const resetToken =  Math.floor(Math.random() * 1000000).toString();
	this.resetPassToken = crypto.createHash('sha256').update(resetToken).digest('hex');
	this.resetPassTokenExp = Date.now()+10*60*1000;
	return resetToken;
}

accountSchema.methods.identity = function () {
    const otp =  Math.floor(Math.random() * 1000000).toString();
	this.verificationCode = crypto.createHash('sha256').update(otp).digest('hex');
	this.resetPassTokenExp = Date.now()+2*60*1000; //2 minutes
	return otp;
}

accountSchema.statics.findByCredential = async function (email, password) {
	if (!email || !password) {
		return { error: 'Khong de trong email va password' };
	}
	let account = await this.findOne({ email: email });
	if (!account) {
		return { error: 'Email khong ton tai' };
	}
	let isMatch = await bcrypt.compare(password, account.password);
	if (!isMatch) {
		return { error: 'password sai' };
	}
	return account;

}

module.exports = mongoose.model(config.account_collection,accountSchema);