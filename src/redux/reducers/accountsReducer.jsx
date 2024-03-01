// authReducer.jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  account: [],
  error: null,
};

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    startAccountsLoading(state) {
      state.isLoading = true;
    },

    resetAccounts: () => initialState,
    addAccountsSuccess(state, action) {
      state.isLoading = false;
      state.account = action.payload;
      state.error = null;
    },
    addAccountsError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteAccountsSuccess(state, action) {
      state.isLoading = false;
      state.account = action.payload;
      state.error = null;
    },
    deleteAccountsError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateAccountsSuccess(state, action) {
      state.isLoading = false;
      state.account = action.payload;
      state.error = null;
    },
    updateAccountsError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});


export const {
  startAccountsLoading,
  resetAccounts,
  addAccountsSuccess,
  addAccountsError,
  deleteAccountsSuccess,
  deleteAccountsError,
  updateAccountsSuccess,
  updateAccountsError,
} = accountsSlice.actions;

export default accountsSlice.reducer;
