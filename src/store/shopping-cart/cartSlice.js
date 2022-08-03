import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    // add item to cart
    addItem(state, action){
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item.id === newItem.id);
      state.totalQuantity++;

      if(!existingItem){
        state.cartItems.push({
          id: newItem.id,
          title: newItem.title,
          image01: newItem.image01,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });

        console.log('existingItem 1', existingItem);
        console.log(newItem, 'newItem');

      }

      else {
        existingItem.quantity++;
        existingItem.totalPrice = Number(existingItem.totalPrice) + Number(existingItem.price);
        console.log(newItem, 'newItem');
      }

      state.totalAmount = state.cartItems.reduce((acc, item) =>(
        acc + Number(item.price) * Number(item.quantity)
      ), 0);
    },
    // remove item from cart
    removeItem(state, action){
      const itemToRemove = action.payload;
      const existingItem = state.cartItems.find(item => item.id === itemToRemove);
      state.totalQuantity--;

      if(existingItem.quantity === 1){
        state.cartItems = state.cartItems.filter(item => item.id !== itemToRemove);
      }
      else {
        existingItem.quantity--;
        existingItem.totalPrice = Number(existingItem.totalPrice) - Number(existingItem.price);
      }

      state.totalAmount = state.cartItems.reduce((acc, item) =>(
        acc + Number(item.price) * Number(item.quantity)
      ),0);
    },
    // delete item from cart
    deleteItem(state, action){
      const itemToDelete = action.payload;
      const existingItem = state.cartItems.find(item => item.id === itemToDelete);
      if(existingItem) {
        state.cartItems = state.cartItems.filter(item => item.id !== itemToDelete);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      state.totalAmount = state.cartItems.reduce((acc, item) =>(
        acc + Number(item.price) * Number(item.quantity)
      ),0);
    }

  }
})

export const cartActions = cartSlice.actions;
export default cartSlice;