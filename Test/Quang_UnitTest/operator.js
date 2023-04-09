// function add(a,b){
//     let c = a + b;
//     if(isNaN(c)){
//         throw new Error('input loi');
//     }   
//     return c; 
// }

// function minus(a,b){
//     let c = a - b;
//     if(isNaN(c)){
//         throw new Error('input loi');
//     }   
//     return c; 
// }
function addFood(foodList, foodName, foodPrice, foodQuantity) {
    // Kiểm tra xem tên món ăn đã tồn tại trong danh sách hay chưa
    const existingFood = foodList.find((food) => food.name == foodName)
    if (existingFood) {
      throw new Error('Thuc an da ton tai')
    }
  
    // Kiểm tra xem giá của món ăn có hợp lệ hay không
    if (foodPrice <= 0) {
      throw new Error('Gia Lon Hon 0')
    }
  
    // Kiểm tra xem số lượng của món ăn có hợp lệ hay không
    if (foodQuantity <= 0) {
      throw new Error('So Luong Lon Hon 0')
    }
  
    // Thêm món ăn vào danh sách
    const newFood = { name: foodName, price: foodPrice, quantity: foodQuantity }
    foodList.push(newFood)
  }

module.exports = {addFood}
