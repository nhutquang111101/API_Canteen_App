let mongoose = require('mongoose');
let configs = require('../configs/configs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

let Schema = new mongoose.Schema({
	username: String,
	email: String,
	roles: String,
	password: String,
	resetPassToken: String,
	resetPassTokenExp: String
});

Schema.pre('save', function (next) {
	if(!this.isModified('password')){
		next();
	}else{
		const salt = bcrypt.genSaltSync(configs.saltRounds);
		this.password = bcrypt.hashSync(this.password, salt);
		next();
	}	
});
Schema.methods.getSignedJWT = function () {
	return jwt.sign({ id: this._id }, configs.JWT_SECRET, { expiresIn: configs.JWT_EXPIRE });
}
Schema.methods.UpdateNew = async function (userNew) {
	let isMatch = await bcrypt.compare(userNew.password, this.password);
	if(!isMatch){
		const salt = bcrypt.genSaltSync(configs.saltRounds);
		userNew.password = bcrypt.hashSync(userNew.password, salt);
		return userNew;
	}
	userNew.password = this.password;
	return userNew;
}
Schema.methods.resetPassword = function () {
	const resetToken = crypto.randomBytes(20).toString('hex');
	this.resetPassToken = crypto.createHash('sha256').update(resetToken).digest('hex');
	this.resetPassTokenExp = Date.now()+10*60*1000;
	return resetToken;
}
Schema.statics.findByCredentinal = async function (email, password) {
	if (!email || !password) {
		return { error: 'khong de trong email va password' };
	}
	let user = await this.findOne({ email: email });
	if (!user) {
		return { error: 'email khong ton tai' };
	}
	let isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		return { error: 'password sai' };
	}
	return user;

}
module.exports = mongoose.model(configs.user_Collection, Schema);