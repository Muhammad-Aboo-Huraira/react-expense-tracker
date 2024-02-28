// authReducer.jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  transactionsData: [],
  error: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    startTransactionsLoading(state) {
      state.isLoading = true;
    },

    resetTransactions: () => initialState,
    addTransactionsSuccess(state, action) {
      state.isLoading = false;
      state.transactionsData = action.payload;
      state.error = null;
    },
    addTransactionsError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteTransactionsSuccess(state, action) {
      state.isLoading = false;
      state.transactionsData = action.payload;
      state.error = null;
    },
    deleteTransactionsError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});


export const {
  startTransactionsLoading,
  resetTransactions,
  addTransactionsSuccess,
  addTransactionsError,
  deleteTransactionsSuccess,
  deleteTransactionsError
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
