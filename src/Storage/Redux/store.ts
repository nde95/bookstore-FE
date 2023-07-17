import { configureStore } from "@reduxjs/toolkit/dist";
import { productItemReducer } from "./productSlice";
import { productItemApi } from "../../APIs";

const store = configureStore({
    reducer:{
        productItemStore: productItemReducer,
        [productItemApi.reducerPath]: productItemApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productItemApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export default store; 