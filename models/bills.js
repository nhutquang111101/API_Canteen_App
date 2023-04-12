const {Bill, BillDetail, Food} = require('../schemas');

module.exports = {
    createBill: async (item)=>{
      const now = new Date();
      let newBill = {account_id: item.id, total_price: 0, date_order: now, isActive: true};
      let bill = new Bill(newBill);
      // console.log(bill);
      await bill.save();
      const result = item.data.foods.map((food) => {
        return {
          idFood: food.id,
          nameFood: food.name,
          quantity: food.quantity,
          priceFood: food.price
        };
      });
      let newBillDetails = {id_bill: bill._id, Foods: result};
      console.log(newBillDetails)
      let billDetails = new BillDetail(newBillDetails);
      await billDetails.save();
      return true;
     },

     editUpdate: async (params)=>{// params.id params.update
        return await Bill.findByIdAndUpdate(params.id,params.update,{new:true});
      },

      getByCusId: async(id)=>{

        return await Bill.find({
          customer_id: id
        }).exec();
      },

    };
