const {Food,Bill, BillDetail } = require("../schemas");

const billDetails = {
    printBill: async(req, res)=>{
      try {
        const billId = req.params.id;
    
        // Lấy thông tin hóa đơn cần in
        const bill = await Bill.findById(billId)
        .populate('account')
        .populate('discounts')
        .populate({
          path: 'billdetail',
          populate: [
            {
              path: 'id_food',
              model: 'Food'
            },
            {
              path: 'id_bill',
              model: 'Bill'
            }
          ]
        });
    
        // Tạo đối tượng output để chứa thông tin hóa đơn
        let output = {
          account: bill.account.fullname,
          create_date: bill.create_date.toLocaleString(),
          note: bill.note,
          billDetails: bill.billdetail.map((detail) => ({
            foodName: detail.id_food.name_food,
            quantity: detail.quantity,
            price: detail.id_food.price_food,
          })),
          totalPrice: bill.total_price,
          discount: 0,
          discountedPrice: bill.total_price,
        };
    
        // Nếu hóa đơn có giảm giá, tính toán giảm giá và giá mới
        if (bill.discounts.length > 0) {
          const discount = bill.discounts[0].discount_value;
          output.discount = discount;
          output.discountedPrice = bill.total_price - bill.total_price * (discount / 100);
        }
    
        res.status(200).json(output);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
};

module.exports = billDetails ;