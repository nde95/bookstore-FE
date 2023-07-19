import { configureStore } from "@reduxjs/toolkit/dist";
import { productItemReducer } from "./productSlice";
import { productItemApi, shoppingCartApi } from "../../APIs";

const store = configureStore({
    reducer:{
        productItemStore: productItemReducer,
        [productItemApi.reducerPath]: productItemApi.reducer,
        [shoppingCartApi.reducerPath]: shoppingCartApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productItemApi.middleware).concat(shoppingCartApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store; 