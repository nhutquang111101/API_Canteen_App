const { Role, Account, } = require('../schemas');
const configs = require('../configs/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
var sendmail = require('../middleware/sendMail');
const { json } = require('body-parser');

const auth = {
  //sign Up 
  signup: async (req) => {
    // let item = {...req, role: ['64060bc2eb16c61cca11b050'], isVerified: false};
    //check tài khoản đã tồn tại
    let check = await Account.findOne({ $or: [{ email: req.email }, { username: req.username }] }).exec();

    if (check) {
      return { error: "Trung username hoac email" };
    } else {
      // Tạo mã xác thực OTP ngẫu nhiên
      let item = {
        ...req, role: ['64060bc2eb16c61cca11b050'], isVerified: false, resetPassToken: undefined, bills: []
      };

      // //save acc
      let newAcc =  new Account(item);
      const otp = newAcc.identity();
      await newAcc.save();
      // // Gửi email xác thực OTP đến email của người dùng
      const message = `
          <!DOCTYPE html>
          <html>
          <head>
              <meta charset="utf-8">
              <title>Smart Canteen</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  font-size: 14px;
                  line-height: 1.5;
                  color: #333;
                  background-color: #c9c9c9;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  width: 600px;
                  margin: 20px auto;
                  background-color: #fff;
                  border-radius: 5px;
                  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                  overflow: hidden;
              }
              .header {
                  background-color: #3498db;
                  color: #fff;
                  padding: 20px;
                  text-align: center;
              }
              .code {
                  font-size: 24px;
                  font-weight: bold;
                  margin: 20px 0;
                  text-align: center;
              }
              .greeting {
                  margin: 20px 0;
                  text-align: center;
              }
              .expire {
                  margin: 20px 0;
                  text-align: center;
              }
              .note {
                  margin: 20px 0;
                  text-align: center;
                  font-size: 12px;
              }
              .thanks {
                  margin: 20px 0;
                  text-align: center;
                  font-size: 16px;
                  font-weight: bold;
              }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <h1>Smart Canteen</h1>
                  </div>
                  <div class="content">
                      <p class="code">Your code is: ${otp}</p>
                      <p class="greeting">Dear ${item.fullName},</p>
                      <p class="expire">Your code will expire in 2 minutes.</p>
                      <p class="note">Please do not share this code with anyone.</p>
                      <p class="thanks">Thank you for using Smart Canteen!</p>
                  </div>
              </div>
          </body>
          </html>`;
      try {
        await sendmail.SendMail({
          email: item.email,
          subject: "[XAC THUC DANG KY]",
          message: message
        });
        return true;
      } catch (error) {
        return "Khong gui duoc mail";
      }
    }
  },

  confirmOTP: async (otp) => {
    // Tìm người dùng bằng mã xác thực OTP
    const verificationCode = crypto.createHash('sha256').update(otp).digest('hex');
    console.log(verificationCode);
    const account = await Account.findOne({
      verificationCode: verificationCode,
      resetPassTokenExp: { $gt: Date.now() }
    });
    if (!account) return false;
    account.isVerified = true;
    account.resetPassTokenExp = undefined;
    account.resetPassToken = undefined;
    account.verificationCode = undefined;
    await account.save();
    return true;
  },

  //Login account
  login: async (item) => {
    const { email, password } = item;
    const result = await Account.findByCredential(email, password);
    if (result.error) {
      return result;
    }
    if (!result.isVerified) {
      return false;
    }
    return result.getSignedJWT();
  },
  Resetpassword: async (item) => {
    const resetPassToken = crypto.createHash('sha256').update(item.resetToken).digest('hex');
    const account = await Account.findOne({
        resetPassToken: resetPassToken ,
        resetPassTokenExp: { $gt: Date.now() 
    }});
    if(!account) return false;
    account.password = item.password;
    account.resetPassToken = undefined;
    account.resetPassTokenExp = undefined;
    await account.save();
    return true;
  },
  ForgotPassword: async (item) => {
    const account = await Account.findOne({ email: item.email }).exec();
    if (!account) return false;
    const resetToken = account.resetPassword();

    await account.save();

    //const resetURL = `${configs.HOST}api/v1/auth/reset-password/${resetToken}`;
    const message = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Smart Canteen Password Reset</title>
        <style type="text/css">
          /* Reset styles */
          body, #bodyTable, #bodyCell {
            height: 100% !important;
            margin: 0;
            padding: 0;
            width: 100% !important;
          }
          table {
            border-collapse: collapse;
          }
          img, a img {
            border: 0;
            outline: none;
            text-decoration: none;
          }
          h1, h2, h3, h4, h5, h6 {
            margin: 0;
            padding: 0;
          }
      
          /* Email body styles */
          #bodyCell {
            padding: 20px;
          }
          #emailContainer {
            background-color: #f2f2f2;
            border-radius: 5px;
            padding: 20px;
          }
          #emailHeader {
            background-color: #007bff;
            color: #fff;
            padding: 20px;
            text-align: center;
          }
          #emailContent {
            margin-top: 20px;
          }
          #emailFooter {
            color: #555;
            font-size: 12px;
            margin-top: 20px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
          <tr>
            <td align="center" valign="top" id="bodyCell">
              <div id="emailContainer">
                <div id="emailHeader">
                  <h1>Smart Canteen Password Reset</h1>
                </div>
                <div id="emailContent">
                  <p>Dear User,</p>
                  <p>We have received a request to reset your password for the Smart Canteen application.</p>
                  <p>Your password reset code is: <strong>${resetToken}</strong></p>
                  <p>This code will expire in 10 minutes.</p>              
                  <p>If you did not request a password reset, please ignore this email.</p>
                  <p>Thank you for using Smart Canteen!</p>
                  <p>Note: This is an automated message. Do not reply to this email.</p>
                </div>
                <div id="emailFooter">
                  <p>© 2023 Smart Canteen. All rights reserved.</p>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </body>
      </html>
    
    `;

    try {
        await sendmail.SendMail({
            email: account.email,
            subject: "[DOI MAT KHAU]",
            message: message
        })
        return true;
    } catch (error) {
        account.resetPassToken = undefined;
        account.verificationCode = undefined;
        account.resetPassTokenExp = undefined;
        await account.save();
        return "khong gui duoc mail";
    }


  },
  updatePass: async(item) => {
    let isMatch = await bcrypt.compare(item.oldPassword, item.account.password);
    if (isMatch) {
      item.account.password = item.newPassword;
      // console.log(item.newPassword);
      await item.account.save();
      return true;
    }
    return false;
  },
};

module.exports = auth;