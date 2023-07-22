import { configureStore } from "@reduxjs/toolkit/dist";
import { productItemReducer } from "./productSlice";
import { authApi, paymentApi, productItemApi, shoppingCartApi } from "../../APIs";
import { shoppingCartReducer } from "./shoppingCartSlice";
import { authReducer } from "./authSlice";

const store = configureStore({
    reducer:{
        productItemStore: productItemReducer,
        shoppingCartStore: shoppingCartReducer,
        authStore: authReducer,
        [productItemApi.reducerPath]: productItemApi.reducer,
        [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [paymentApi.reducerPath]: paymentApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productItemApi.middleware).concat(shoppingCartApi.middleware).concat(authApi.middleware).concat(paymentApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store; 