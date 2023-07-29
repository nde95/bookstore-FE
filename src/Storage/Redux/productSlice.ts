import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productItem: [],
  search: "",
};

export const productItemSlice = createSlice({
  name: "ProductItem",
  initialState: initialState,
  reducers: {
    setProductItem: (state, action) => {
      state.productItem = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setProductItem, setSearchItem } = productItemSlice.actions;
export const productItemReducer = productItemSlice.reducer;
