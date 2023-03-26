const {Food, Category,Bill, BillDetail, Account} = require("../models/models");

const foodController = {

     /// ADD Food
     addFood: async(req, res)=>{
        try{
            console.log("vao Server");
            const newFood = new Food(req.body);
            console.log(newFood);
            if(req.file){
                newFood.image_food = req.file.path; 
            }
            const saveFood = await newFood.save();
            if(req.body.category){
                const category = Category.findById(req.body.category);
                await category.updateOne({$push: {category: saveFood._id}});

            }
            res.status(200).json(saveFood);
        }catch(err){
            res.status(500).json(err);
            console.log(""+err);
        }
        // res.status(200).json(req.body);
    },

    // order food
    orderFood: async(req, res)=>{
        try {
            // Lấy thông tin đặt hàng từ request body
            const { accountId, note, discountId, foods } = req.body;
        
            // Tạo bill mới
            const bill = new Bill({
              account: accountId,
              create_date: new Date(),
              total_price: 0,
              note,
              quantity: 0,
              discounts: discountId,
            });
            
            // Lưu bill vào database
            const savedBill = await bill.save();
            if(req.body.account){
                const account = await Account.findById(req.body.account);
                await savedBill.updateOne({$set: {account: account._id}});
            }
        
            // Tính tổng tiền và số lượng sản phẩm, cập nhật vào bill
            let totalPrice = 0;
            let totalQuantity = 0;
            const foodtmp = [];
           
            for (let i = 0; i < foods.length; i++) {
              const foodId = foods[i]._id;
              const food = await Food.findById(foodId);
              console.log("food:  "+ food);
              const quantity = foods[i].quantity;
              const price = food.price_food;
              foodtmp.push({
                idfood: foodId,
                namefood: foods[i].namefood,
                priceFood: price,
                quantity: quantity
              });
            
              // Cập nhật tổng tiền và số lượng
              totalPrice += price * quantity;
              totalQuantity += quantity;
            }
            console.log(foodtmp);
            // Tạo bill detail mới
            const billDetail = new BillDetail({
              Foods: [...foodtmp],
              id_bill: savedBill._id,
            });
            await billDetail.save();
        
            // Cập nhật tổng tiền và số lượng sản phẩm của bill
            savedBill.total_price = totalPrice;
            savedBill.quantity = totalQuantity;
            await savedBill.save();
        
            res.status(200).json({ message: 'Order successful!' });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    },


};

module.exports = foodController;