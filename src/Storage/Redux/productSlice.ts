import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productItem: [],
};

export const productItemSlice = createSlice({
    name: "ProductItem",
    initialState: initialState,
    reducers:{
        setProductItem: (state, action) => {
            state.productItem = action.payload;
        },
    },
});

export const { setProductItem } = productItemSlice.actions;
export const productItemReducer = productItemSlice.reducer;