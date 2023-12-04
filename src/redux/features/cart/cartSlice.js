import { createSlice } from "@reduxjs/toolkit";




let initialState = {
   cart: [],
   totalAmoutn: 0,
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

      addToCart: (state, action) => {
         if (!action.payload) return

         const cartItem = state.cart.find(item => item.id === action.payload.id);

         if (cartItem) {
            cartItem.qty++
         } else {
            state.cart.push(action.payload)
         }
      },
      increase: (state, action) => {
         if (!action.payload) return

         const cartItem = state.cart.find(item => item.id === action.payload.id)

         if (cartItem) {
            cartItem.qty++
         }
      },
      descrease: (state, action) => {
         if (!action.payload) return

         const cartItem = state.cart.find(item => item.id === action.payload.id)

         if (cartItem) {
            cartItem.qty--
         }
      },
      removeFromCart: (state, action) => {
         if (!action.payload) return

         state.cart = state.cart.find(item => item.id !== action.payload.id)
      },

      clearCart: (state, action) => {
         state.cart = []
      },
   },
   extraReducers: (builder) => {
      //  for cart api 
      // condition 
      // addCase.(builder => { })
   }
})


export default cartSlice.reducer

export const { addToCart, removeFromCart, increase, descrease, clearCart } = cartSlice.actions;