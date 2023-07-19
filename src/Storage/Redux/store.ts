import { configureStore } from "@reduxjs/toolkit/dist";
import { productItemReducer } from "./productSlice";
import { productItemApi, shoppingCartApi } from "../../APIs";
import { shoppingCartReducer } from "./shoppingCartSlice";

const store = configureStore({
    reducer:{
        productItemStore: productItemReducer,
        shoppingCartStore: shoppingCartReducer,
        [productItemApi.reducerPath]: productItemApi.reducer,
        [shoppingCartApi.reducerPath]: shoppingCartApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productItemApi.middleware).concat(shoppingCartApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store; 