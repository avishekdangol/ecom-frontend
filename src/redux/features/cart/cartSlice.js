import { createSlice } from "@reduxjs/toolkit";


let initialState = {
    cart: [],
    status: 'idle',  // idle | pending | fillfulled | failed
    errors: null
}


export const cartSlice = createSlice({
 name: 'cart',
 initialState,
 reducers:{
    addToCart: (state, action) => {
       if(action.payload) {
          state.cart.push(action.payload)
       }
    }
 }
})