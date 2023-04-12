const Bill = require('../schemas/bills');

module.exports = {
    createBill: async (item)=>{
      const {id, date, active, total} = newBill;
      var bill = new Bill(newBill);
      newBill.id = item.id;
      newBill.total = item.total;
      newBill.date = item.date;
      newBill.id = item.id;
      console.log(bill);
      return (bill).save();
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
