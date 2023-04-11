const nodemailer = require("nodemailer");
const configs = require('../configs/config')

// async..await is not allowed in global scope, must use a wrapper
module.exports = {
    SendMail: async function (options) {

        let transporter = nodemailer.createTransport({
            host: configs.SMTP_Host,
            port: configs.SMTP_Port,
            secure: true, // true for 465, false for other ports
            auth: {
                user: configs.SMTP_Username, // generated ethereal user
                pass: configs.SMTP_Password, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: configs.SMTP_Username, // sender address
            to: options.email, // list of receivers
            subject: options.subject, // Subject line
            html: options.message, // plain text body
        });
        console.log("Message sent: %s", info.messageId);
    }
}