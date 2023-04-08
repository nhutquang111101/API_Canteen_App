const {Food,Bill, BillDetail } = require("../models/models");

const billController = {
  printBill: async (req, res) => {
    try {
      const billId = req.params.id;
      console.log(billId);

      const billdetail = await BillDetail.findOne({
        id_bill: billId
      }).populate(
        'Foods',
      ).populate({
        path: "id_bill",
        populate: "account"
      });
      let output = {
        fullname: billdetail.id_bill.account.fullname,
        foodlist: billdetail.Foods
      };

      res.status(200).json(output);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },

    getdetail: async(req, res)=>{
      try{

      }catch(err){}
    },
};

module.exports = billController;