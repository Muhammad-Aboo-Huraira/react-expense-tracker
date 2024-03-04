import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Snackbar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  addAccounts,
  bankAccountExists,
  deleteAccount,
} from "../../../redux/actions/accountsActions";
import MuiAlert from "@mui/material/Alert";

const AllAccounts = () => {
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const userId = useSelector((state) => state.auth.user.uid);
  const isLoading = useSelector((state) => state.accounts.isLoading);
  const newAccounts = useSelector((state) => state.accounts.account);
  const filteredAccounts = newAccounts.filter(
    (accountItem) =>
      accountItem.accountName !== "Cash" &&
      accountItem.accountName !== "Savings"
  );
  const cashAmount =
    newAccounts.find((accountItem) => accountItem.accountName === "Cash")
      ?.amount || 0;
  const savingsAmount =
    newAccounts.find((accountItem) => accountItem.accountName === "Savings")
      ?.amount || 0;
  const dispatch = useDispatch();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleAccountNameChange = (event) => {
    let value = event.target.value;
    if (value.length <= 10) {
      setAccountName(value);
    }
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const bankAccountAreadyExists = await bankAccountExists(
        accountName,
        userId
      );
      if (!bankAccountAreadyExists) {
        await dispatch(addAccounts(accountName, amount, userId, newAccounts));
        setAccountName("");
        setAmount("");
        setSnackbarMessage("Account added successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setIsSubmitting(false);
      } else {
        setSnackbarMessage("Account already exists!");
        setSnackbarSeverity("error");
        setAccountName("");
        setAmount("");
        setSnackbarOpen(true);
        setIsSubmitting(false);
      }
    } catch (error) {
      setSnackbarMessage("Failed to add account");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteAccount = (accountName) => {
    setAccountToDelete(accountName);
    setDeleteConfirmationOpen(true);
  };

  const confirmDeleteAccount = async () => {
    setIsDeletingAccount(true);
    try {
      await dispatch(deleteAccount(accountToDelete, userId, newAccounts));
      setSnackbarMessage("Account deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to delete account");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
    setDeleteConfirmationOpen(false);
    setIsDeletingAccount(false);
  };

  const cancelDeleteAccount = () => {
    setDeleteConfirmationOpen(false);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        maxWidth: "800px !important",
        minWidth: "800px !important",
        marginTop: "20px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Add Account
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Account Name"
          variant="outlined"
          value={accountName}
          onChange={handleAccountNameChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Amount"
          variant="outlined"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          fullWidth
          margin="normal"
          autoComplete="off"
          required
          InputProps={{ inputProps: { min: 0, max: 9999999 } }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading && isSubmitting}
        >
          {isLoading && isSubmitting ? (
            <CircularProgress size={24} />
          ) : (
            "ADD ACCOUNT"
          )}
        </Button>
      </form>
      <br />
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
      <Typography variant="h4" gutterBottom>
        Default Accounts
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-around"
      >
        <Card sx={{ margin: "20px" }}>
          <CardContent>
            <Typography variant="h6" component="div">
              Account: Cash
            </Typography>
            <Typography variant="body2">Amount: {cashAmount}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ margin: "20px" }}>
          <CardContent>
            <Typography variant="h6" component="div">
              Account: Savings
            </Typography>
            <Typography variant="body2">Amount: {savingsAmount}</Typography>
          </CardContent>
        </Card>
      </Box>
      <Typography variant="h4" gutterBottom>
        Other Accounts
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-around"
        fullWidth
      >
        {filteredAccounts.map((accountItem, index) => (
          <Card key={index} sx={{ margin: "20px", width: "25%" }}>
            <CardContent>
              <Tooltip
                key={index}
                title={accountItem.accountName}
                placement="top"
                sx={{ maxWidth: "none" }}
              >
                <Typography variant="h6" component="div" noWrap>
                  Account: {accountItem.accountName}
                </Typography>
              </Tooltip>
              <Tooltip
                key={index}
                title={accountItem.amount}
                placement="top"
                sx={{ maxWidth: "none" }}
              >
                <Typography variant="body2">
                  Amount: {accountItem.amount}
                </Typography>
              </Tooltip>
              <IconButton
                color="error"
                aria-label="delete account"
                onClick={() => handleDeleteAccount(accountItem.accountName)}
              >
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Dialog
        open={deleteConfirmationOpen}
        onClose={cancelDeleteAccount}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={cancelDeleteAccount}
            color="error"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDeleteAccount}
            color="primary"
            variant="contained"
            disabled={isDeletingAccount}
            autoFocus
          >
            {isDeletingAccount ? <CircularProgress size={24} /> : "Yes, Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AllAccounts;
