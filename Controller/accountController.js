const {Role, Account, } = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { json } = require('body-parser');

const accountController = {
    //sign Up 
    signup: async(req, res)=>{
        try{
             // Tạo mật khẩu mới sử dụng thư viện bcrypt
            // const hashedPassword = await bcrypt.hash(req.body.password, 10);

            // Tạo mã xác thực OTP ngẫu nhiên
            const verificationCode = Math.floor(Math.random() * 1000000).toString();

            //check tài khoản đã tồn tại
            // const account = await Account.findOne({username});
            // if(account){
            //     json.body("Tài Khoản đã tồn tại ");
            //     console.log("tài khoản đã tồn tại...!");
            // }
            let account = await Account.findOne({ username: req.body.username });
            if (account) {
            return res.status(400).send('tài khoản đã tồn tại');
            }

            // Tạo người dùng mới
            const newAccount = new Account({
                username: req.body.username,
                fullname: req.body.fullname,
                phone: req.body.phone,
                password:  req.body.password,
                verificationCode: verificationCode,
                role: [
                  '64060bc2eb16c61cca11b050'
                ]
            });

          
            
            await newAccount.save();
            

            // Gửi email xác thực OTP đến email của người dùng
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: 'trantanphat125678@gmail.com',
                pass: 'nrmwnrxofoppllpr',
                },
            });


            const mailOptions = {
                from: 'trantanphat125678@gmail.com',
                to: req.body.username,
                subject: 'Xác thực tài khoản',
                html: `<p>Vui lòng sử dụng mã xác thực OTP này để hoàn tất đăng ký tài khoản: ${verificationCode}</p>`,
              };

              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });

              res.status(201).json({ message: 'Đăng ký thành công. Vui lòng kiểm tra email của bạn để hoàn tất đăng ký' });

        }
        catch(err){
            console.log(err);
            res.status(500).json({ message: 'Đăng ký thất bại' });  
        }

    },

    confirmotp: async(req, res)=>{
        try {
            // Tìm người dùng bằng mã xác thực OTP
            const accounts = await Account.findOne({ verificationCode: req.body.verificationCode });
            if (!accounts) {
              return res.status(400).json({ message: 'Mã xác thực OTP không đúng' });
            }
        
            // Kiểm tra thời gian hiện tại có còn trong thời gian xác thực hay không
            const currentTime = new Date();
            if (currentTime > accounts.verificationCodeExpires) {
              return res.status(400).json({ message: 'Mã xác thực OTP đã hết hạn' });
            }
        
            // Cập nhật trạng thái xác thực và xóa mã xác thực OTP
            accounts.isVerified = true;
            accounts.verificationCode = null;
            accounts.verificationCodeExpires = null;
            await accounts.save();
        
            res.json({ message: 'Xác thực thành công' });
          } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Lỗi xác thực OTP' });
          }
    },

    //Login account
    login: async(req, res)=>{
      try {
        const { username, password } = req.body;
        const account = await Account.findOne({ username, password });
        if (!account) {
          return res.status(400).send('Thông Tin đăng Nhập Sai...!!!!! Check token Acc');
        }
        return res.status(200).json(account);
      } catch (error) {
        console.log(error);
        return res.status(500).send('Lỗi hệ thống, vui lòng thử lại sau');
      }
    }
};

module.exports = accountController;