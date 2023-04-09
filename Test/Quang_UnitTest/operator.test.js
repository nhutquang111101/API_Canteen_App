const {addFood} = require('./operator');

// test('add(2,3)', () => { 
//     expect(add(2, 3)).toBe(2+3);
// })

// test("add('abc',3)", () => { 
//     expect(()=>{
//         add('abc', 3)
//     }).toThrow("input loi");
// })

// test("minus(2,'abc')", () => { 
//     expect(()=>{
//         minus(2, 'abc')
//     }).toThrow("input loi");
// })

// test("minus(2,'3')", () => { 
//    expect(minus(2,'3')).toBe(-1);
// })

// test("minus(2,'3')", () => { 
//     expect(minus(2,'3')).toBe(-1);
//  })


describe('addFood', () => {
  test('should add a new food', () => {
    const foodList = []
    const foodName = 'Burger'
    const foodPrice = 10
    const foodQuantity = 20

    addFood(foodList, foodName, foodPrice, foodQuantity)

    expect(foodList).toHaveLength(1)
    expect(foodList[0]).toMatchObject({
      name: foodName,
      price: foodPrice,
      quantity: foodQuantity,
    })
  })

  test('should not add a food with an existing name', () => {
    const foodList = [
      { name: 'Pizza', price: 10, quantity: 20 },
      { name: 'Spaghetti', price: 8, quantity: 25 },
    ]
    const foodName = 'Pizza'
    const foodPrice = 10
    const foodQuantity = 20

    // addFood(foodList, foodName, foodPrice, foodQuantity)

    // expect(foodList).toHaveLength(2)
    expect(() => addFood(foodList, foodName, foodPrice, foodQuantity)).toThrow(
        'Thuc an da ton tai'
      )
  
      expect(foodList).toHaveLength(2)
  })

  test('should not add a food with price less than or equal to zero', () => {
    const foodList = []
    const foodName = 'Fries'
    const foodPrice = 0
    const foodQuantity = 30

    expect(() => addFood(foodList, foodName, foodPrice, foodQuantity)).toThrow(
      'Gia Lon Hon 0'
    )

    expect(foodList).toHaveLength(0)
  })

  test('should not add a food with quantity less than or equal to zero', () => {
    const foodList = []
    const foodName = 'Salad'
    const foodPrice = 5
    const foodQuantity = -5

    expect(() => addFood(foodList, foodName, foodPrice, foodQuantity)).toThrow(
      'So Luong Lon Hon 0'
    )

    expect(foodList).toHaveLength(0)
  })
})