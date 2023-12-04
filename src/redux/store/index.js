import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import cartReducer from "../features/cart/cartSlice";


/**
 *  store
 */

const persistConfig = {
    key: 'root',
    version: 1,
    storage,  
}

const reducer = combineReducers({
    cart: cartReducer
})


const persistedReducer = persistReducer(persistConfig, reducer);

export const store  = configureStore({
    reducer:{
        persistedReducer
    },
})


