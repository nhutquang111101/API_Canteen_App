const Cart = require('../schemas/carts');

module.exports = {
    addtocart: async (item)=>{

      var cart = new Cart(item);
      console.log(cart);
      return (cart).save();
     },

     editCart: async (params)=>{// params.id params.update
        return await Cart.findByIdAndUpdate(params.id,params.update,{new:true});
      },

      getByCusId: async(id)=>{
        return await Cart.find({
          customer_id: id
        }).exec();
      },
      getAllCart:async ()=>{
        return await Cart.find({}).exec();
      },
      getcartIsActive:async ()=>{
        return await Cart.find({isActive: true}).exec();
      },
      getCartById:async (id)=>{
        return await Cart.findById(id).exec();
      },
      deleteAnCart: async (params)=>{// params.id params.update
        return await Cart.findByIdAndUpdate(params.id,params.update,{new:true});
      },
    
      deleteCartInTrash:async(id)=>{
        return await Cart.findByIdAndDelete(id);
      }

    };
//   getAllFood:async ()=>{
//     return await Food.find({}).exec();
//   },

//   getFoodById:async (id)=>{
//     return await Food.findById(id).exec();
//   },

//   getFoodByCategory: async(id)=>{

//     // var newFood = new Food(id);
//     // var list = newFood.category.findById(id);
//     return await Food.find({
//       category: id
//     }).exec();
//   },

//   editAnFood: async (params)=>{// params.id params.update
//     return await Food.findByIdAndUpdate(params.id,params.update,{new:true});
//   },
  

