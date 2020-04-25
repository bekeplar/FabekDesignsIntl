import { addProduct } from './productActions';

test('Should call add product and return object', () => {
  const obj = {
    type: 'ADD_PRODUCT',
    payload: {
      item: 'offshoulder',
      price: 34,
      dateAdded: 0
    }
  };
  const action = addProduct('offshoulder', 34, 0);
  
  expect(action).toEqual(obj);
});
