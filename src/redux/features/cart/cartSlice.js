import { createSlice } from "@reduxjs/toolkit";



let initialState = {
   products: [],
   totalAmount: 0,
   totalCount: 0,
   status: 'idle',  // idle | pending | fillfulled | failed
   errors: null
}


export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      /**
       *  add to cart function 
       * @param {*} state 
       * @param {*} action 
       * @returns 
       */

      getCartTotal: (state, action) => {
         let { totalAmount, totalCount } = state.products.reduce((cartTotal, cartItem) => {
            const { price, qty } = cartItem;
            const itemTotal = price * qty;

            cartTotal.totalAmount += itemTotal;
            cartTotal.totalCount += qty;
            return cartTotal;
         }, {
            totalAmount: 0,
            totalCount: 0,
         });

         state.totalAmount = parseFloat((totalAmount.toFixed(2)))
         state.totalCount = totalCount
      },
      addToCart: (state, action) => {
         if (!action.payload) return

         const cartItem = state.products.find(item => item.id === action.payload.id);

         if (cartItem) {
            cartItem.qty++
         } else {
            state.products.push(action.payload)
         }
      },
      increase: (state, action) => {
         if (!action.payload) return

         const cartItem = state.products.find(item => item.id === action.payload.id)

         if (cartItem) {
            cartItem.qty++
         }
      },
      descrease: (state, action) => {
         if (!action.payload) return

         const cartItem = state.products.find(item => item.id === action.payload.id)

         if (cartItem) {
            cartItem.qty--
         }
      },
      removeFromCart: (state, action) => {
         if (!action.payload) return

         state.products = state.products.filter(item => item.id !== action.payload.id)
      },

      clearCart: (state, action) => {
         state.products = []
      },
   },
});





export const { addToCart, removeFromCart, increase, descrease, clearCart, getCartTotal } = cartSlice.actions;

export default cartSlice.reducer
