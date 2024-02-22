// authReducer.jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  accounts: null,
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
      state.accounts = action.payload;
      state.error = null;
    },
    addAccountsError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteAccountsSuccess(state) {
      state.isLoading = false;
      state.accounts = null;
      state.error = null;
    },
    deleteAccountsError(state, action) {
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
  deleteAccountsError
} = accountsSlice.actions;

export default accountsSlice.reducer;
