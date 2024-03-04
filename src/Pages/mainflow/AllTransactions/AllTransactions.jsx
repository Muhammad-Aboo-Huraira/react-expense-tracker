import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { deleteTransaction } from "../../../redux/actions/transactionsActions";
import MuiAlert from "@mui/material/Alert";

const AllTransactions = () => {
  const dispatch = useDispatch();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState("");
  const [isDeletingTransaction, setIsDeletingTransaction] = useState(false);
  const isLoading = useSelector((state) => state.transactions.isLoading);
  const transactionsData = useSelector(
    (state) => state.transactions.transactionsData
  );

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const handleDeleteTransaction = (docId) => {
    setTransactionToDelete(docId);
    setDeleteConfirmationOpen(true);
  };

  const cancelDeleteTransaction = () => {
    setDeleteConfirmationOpen(false);
  };

  const confirmDeleteTransaction = async () => {
    setIsDeletingTransaction(true);
    await dispatch(deleteTransaction(transactionToDelete, transactionsData));
    setSnackbarMessage("Transaction deleted successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    setDeleteConfirmationOpen(false);
    setIsDeletingTransaction(false);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        maxWidth: "800px !important",
        minWidth: "800px !important",
        marginBottom: "250px",
        marginTop: "20px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        All Transactions
      </Typography>
      <Container
        sx={{
          maxHeight: "420px",
          overflowY: "auto",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Account</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Amount</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Type</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Category</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionsData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} style={{ textAlign: "center" }}>
                  Perform transactions to add data here
                </TableCell>
              </TableRow>
            ) : (
              transactionsData
                .slice() // Create a copy of the array to avoid mutating the original data
                .sort((a, b) => b.created_time.seconds - a.created_time.seconds)
                .map((transaction) => (
                  <TableRow key={transaction.doc_id}>
                    <TableCell>{transaction.account || "-"}</TableCell>
                    <TableCell>{transaction.amount || "-"}</TableCell>
                    <TableCell>{transaction.transactionType || "-"}</TableCell>
                    <TableCell>{transaction.created_date || "-"}</TableCell>
                    <TableCell>{transaction.category || "-"}</TableCell>
                    <TableCell>
                      <IconButton
                        variant="contained"
                        color="error"
                        onClick={() =>
                          handleDeleteTransaction(transaction.doc_id)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </Container>
      <Dialog
        open={deleteConfirmationOpen}
        onClose={cancelDeleteTransaction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the transaction?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={cancelDeleteTransaction}
            color="error"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDeleteTransaction}
            color="primary"
            variant="contained"
            disabled={isLoading && isDeletingTransaction}
            autoFocus
          >
            {isLoading && isDeletingTransaction ? (
              <CircularProgress size={24} />
            ) : (
              "Yes, Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>
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
