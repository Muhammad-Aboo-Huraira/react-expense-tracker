import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { dispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import { addAccounts } from "../../../redux/actions/accountsActions";
import { Box, Card, CardContent, CircularProgress, Container, Snackbar } from "@material-ui/core";
import MuiAlert from '@mui/material/Alert';

const AllAccounts = () => {
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const userId = useSelector((state) => state.auth.user.uid);
  const isLoading = useSelector((state) => state.accounts.isLoading);
  const newAccounts = useSelector((state) => state.accounts.account);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleAccountNameChange = (event) => {
    setAccountName(event.target.value);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addAccounts(accountName, amount, userId, newAccounts));
    setAccountName("");
    setAmount("");
    setSnackbarMessage("Account added successfully!");
      setSnackbarSeverity("success"); // change agr error ka show karana ho toh error nhi toh success
      setSnackbarOpen(true);
  };

  return (
    <Container maxWidth="md">
      {" "}
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
          required
          InputProps={{ inputProps: { min: 0, max: 9999999 } }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "ADD ACCOUNT"}
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
        All Accounts
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-between"
      >
        {newAccounts.map((accountItem, index) => (
          <Card key={index} style={{ marginBottom: "16px", width: "30%" }}>
            {" "}
            {/* Adjust card width and margin as needed */}
            <CardContent>
            <Typography variant="h6" component="div">
                Account: {accountItem.accountName}
              </Typography>
              <Typography variant="body2">
                Amount: {accountItem.amount}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default AllAccounts;
