// authReducer.jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  category: [],
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    startCategoriesLoading(state) {
      state.isLoading = true;
    },

    resetCategories: () => initialState,
    addCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.category = action.payload;
      state.error = null;
    },
    addCategoriesError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.category = action.payload;
      state.error = null;
    },
    deleteCategoriesError(state, action) {
      state.isLoading = false;
      state.category = [];
      state.error = action.payload;
    },
  },
});


export const {
  startCategoriesLoading,
  resetCategories,
  addCategoriesSuccess,
  addCategoriesError,
  deleteCategoriesSuccess,
  deleteCategoriesError
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
