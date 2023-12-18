import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    wishlist: [],
    status: 'idle',
    errors: null
}


export const wishlistSlice = createSlice({
    name:'wishlist',
    initialState,
    reducers: {
        addToWishList: (state, action) => {
            if(!action.payload) return 

            // const items = 
        }
    },
    // extraReducers: 
})


export default wishlistSlice.reducer;