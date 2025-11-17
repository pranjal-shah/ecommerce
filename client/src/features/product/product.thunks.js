import { createAsyncThunk } from "@reduxjs/toolkit";
import { setProducts } from "./productSlice";
import { getProductsByCategories } from "../../apis/product.api";

export const fetchProductsByCategories = createAsyncThunk(
  "product/fetchByCategories",
  async (
    { categories, last_category = null },
    { dispatch, rejectWithValue }
  ) => {
    try {
      let categoryIds;

      if (categories.length === 0) {
        console.log("lccccc", last_category);
        categoryIds = [last_category[0].id];
      } else {
        categoryIds = Array.from(
          new Set(
            categories.flatMap((cat) =>
              cat.parent_category_id
                ? [cat.id, cat.parent_category_id]
                : [cat.id]
            )
          )
        );
      }

      const response = await getProductsByCategories(categoryIds);

      console.log("after product", response.products);
      dispatch(setProducts(response.products));

      return response.products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
