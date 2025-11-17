import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {
    categories: [],
    products: [],
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      console.log("redux product:", action.payload);
      state.product.products = action.payload;
    },
    setCategories: (state, action) => {
      console.log("redux category:", action.payload);
      state.product.categories = action.payload;
    },
    emptyProduct: (state) => {
      state.product = {
        categories: [],
        products: [],
      };
    },
  },
});

export const { setProducts, setCategories, emptyProduct } =
  productSlice.actions;

export default productSlice.reducer;
