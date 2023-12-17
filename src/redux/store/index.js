import {
    configureStore,
} from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
// import storage from "redux-persist/lib/storage";
// import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
// import { combineReducers } from "redux";
import cartReducer from "../features/cart/cartSlice";



/**
 *  store
 */

// Augment middleware to consider Immutable.JS iterables serializable

// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage,
// }

// const reducer = combineReducers({
//     cart: cartReducer,
// })


// const persistedReducer = persistReducer(persistConfig, reducer);


export const store = configureStore({
    reducer: {
        cart: cartReducer
    },
    middleware: [thunk]
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: {
    //             ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //         },
    //     }),
})



