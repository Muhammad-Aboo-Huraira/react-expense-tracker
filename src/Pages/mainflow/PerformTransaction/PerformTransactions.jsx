import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  MenuItem,
  Typography,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { addTransactions } from "../../../redux/actions/transactionsActions";

const AllTransactions = () => {
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [account, setAccount] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const userId = useSelector((state) => state.auth.user.uid);
  const newAccounts = useSelector((state) => state.accounts.account);
  const newCategories = useSelector((state) => state.categories.category);
  const newTransaction = useSelector(
    (state) => state.transactions.transactionsData
  );
  const isLoading = useSelector((state) => state.transactions.isLoading);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    await dispatch(
      addTransactions(
        account,
        amount,
        userId,
        newTransaction,
        category,
        transactionType
      )
    );
    setAccount("");
    setAmount("");
    setCategory("");
    setTransactionType("");
    setSnackbarMessage("Transaction added successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    setIsSubmitting(false);
  };

  const handleAmountChange = (event) => {
    let value = event.target.value;
    if (
      value === "" ||
      (parseFloat(value) >= 0 && parseFloat(value) <= 9999999)
    ) {
      setAmount(value);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Perform Transaction
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Amount"
          variant="outlined"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          fullWidth
          margin="normal"
          required
          InputProps={{ inputProps: { min: 0, max: 9999999 } }}
        />
        <TextField
          select
          label="Type of Transaction"
          variant="outlined"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          fullWidth
          margin="normal"
          required
        >
          <MenuItem value="Income">Income</MenuItem>
          <MenuItem value="Expense">Expense</MenuItem>
        </TextField>
        <TextField
          select
          label="Account"
          variant="outlined"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          fullWidth
          margin="normal"
          required
        >
          <MenuItem value="Cash">Cash</MenuItem>
          <MenuItem value="Savings">Savings</MenuItem>
          {newAccounts.map((accountsItem) => (
            <MenuItem
              key={accountsItem.doc_id}
              value={accountsItem.accountName}
            >
              {accountsItem.accountName}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Category"
          variant="outlined"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          margin="normal"
          disabled={transactionType === "Income"}
          required
        >
          <MenuItem value="Home">Home</MenuItem>
          <MenuItem value="Shopping">Shopping</MenuItem>
          <MenuItem value="Utility bills">Utility bills</MenuItem>
          {newCategories.map((categoryItem) => (
            <MenuItem
              key={categoryItem.doc_id}
              value={categoryItem.categoryName}
            >
              {categoryItem.categoryName}
            </MenuItem>
          ))}
        </TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading && isSubmitting}
        >
          {isLoading && isSubmitting ? (
            <CircularProgress size={24} />
          ) : (
            "ADD TRANSACTION"
          )}
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default AllTransactions;
