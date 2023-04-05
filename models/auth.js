var schema = require('../schemas/users');
var sendmail = require('../middleware/sendMail');
const configs = require('../configs/configs');
const crypto = require('crypto');

module.exports = {
    Register: async (item) => {
        let check = await schema.find({ $or: [{ email: item.email }, { username: item.username }] }).exec();
        if (check) {
            return { error: "trung username hoac email" };
        } else {
            let newItem = await new schema(item).save();
            return await newItem.getSignedJWT();
        }
    },

    Login: async (item) => {
        const { email, password } = item;
        const result = await schema.findByCredentinal(email, password);
        if (result.error) {
            return result;
        }
        return result.getSignedJWT();
    },
    Resetpassword: async (item) => {
        const resetPassToken = crypto.createHash('sha256').update(item.resetToken).digest('hex');
        const user = await schema.findOne({
            resetPassToken: resetPassToken ,
            resetPassTokenExp: { $gt: Date.now() 
        }});
        if(!user) return false;
        user.password = item.password;
        user.resetPassToken = undefined;
        user.resetPassTokenExp = undefined;
        await user.save();
        return true;
    },
    ForgotPassword: async (item) => {
        const user = await schema.findOne({ email: item.email }).exec();
        if (!user) return false;
        const resetToken = user.resetPassword();
        console.log(user);
        await user.save();

        const resetURL = `${configs.HOST}api/v1/auth/resetpassword/${resetToken}`;
        const message = `Truy cap vao link de doi passs: ${resetURL}`;

        try {
            await sendmail.SendMail({
                email: user.email,
                subject: " Doi Pass",
                message: message
            })
            return "check mail";
        } catch (error) {
            user.resetPassToken = undefined;
            user.resetPassTokenExp = undefined;
            await user.save();
            return "khong gui duoc mail";
        }


    }

}