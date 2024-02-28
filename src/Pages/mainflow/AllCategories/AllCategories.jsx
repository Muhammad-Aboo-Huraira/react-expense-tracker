import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  addCategories,
  categoryExists,
  deleteCategory,
} from "../../../redux/actions/categoriesActions";
import MuiAlert from "@mui/material/Alert";

const AllCategories = () => {
  const [category, setCategory] = useState("");
  const userId = useSelector((state) => state.auth.user.uid);
  const isLoading = useSelector((state) => state.categories.isLoading);
  const newCategories = useSelector((state) => state.categories.category);
  const dispatch = useDispatch();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingCategory, setIsDeletingCategory] = useState(false);

  // useEffect(() => {
  //   if (categoriesError) {
  //     setSnackbarMessage(categoriesError);
  //     setSnackbarSeverity("error");
  //     setSnackbarOpen(true);
  //     dispatch(addCategoriesError(""));
  //   }
  // }, [categoriesError]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleCategoryChange = (event) => {
    let value = event.target.value;
    if (value.length <= 20) {
      setCategory(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true)
    if (category === "Home" || category === "Shopping" || category === "Utility bills") {
      setCategory("");
      setSnackbarMessage("Category already exists!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    const categoryAreadyExists = await categoryExists(category, userId);
    if (!categoryAreadyExists) {
      await dispatch(addCategories(category, userId, newCategories));
      setCategory("");
      setSnackbarMessage("Category added successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setIsSubmitting(false);
    } else {
      setCategory("");
      setSnackbarMessage("Category already exists!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = (categoryName) => {
    setCategoryToDelete(categoryName);
    setDeleteConfirmationOpen(true);
  };

  const confirmDeleteCategory = async () => {
    setIsDeletingCategory(true);
    await dispatch(deleteCategory(categoryToDelete, userId, newCategories));
    setSnackbarMessage("Category deleted successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    setDeleteConfirmationOpen(false);
    setIsDeletingCategory(false);
  };

  const cancelDeleteCategory = () => {
    setDeleteConfirmationOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Add New Category
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Category"
          variant="outlined"
          value={category}
          onChange={handleCategoryChange}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading && isSubmitting}
        >
          {isLoading && isSubmitting ? <CircularProgress size={24} /> : "ADD NEW CATEGORY"}
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
        All Categories
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-between"
      >
                {/* Home category */}
                <Card style={{ marginBottom: "16px", width: "30%" }}>
          <CardContent>
            <Typography variant="body2">Home</Typography>
          </CardContent>
        </Card>

        {/* Shopping category */}
        <Card style={{ marginBottom: "16px", width: "30%" }}>
          <CardContent>
            <Typography variant="body2">Shopping</Typography>
          </CardContent>
        </Card>

        {/* Utility bills category */}
        <Card style={{ marginBottom: "16px", width: "30%" }}>
          <CardContent>
            <Typography variant="body2">Utility bills</Typography>
          </CardContent>
        </Card>
        {newCategories.map((categoryItem, index) => (
          <Card key={index} style={{ marginBottom: "16px", width: "30%" }}>
            <CardContent>
              <Typography variant="body2">
                {categoryItem.categoryName}
              </Typography>
              <IconButton
                color="primary"
                aria-label="delete category"
                onClick={() => handleDeleteCategory(categoryItem.categoryName)}
              >{isLoading && isDeletingCategory && categoryToDelete === categoryItem.categoryName ? (
                <CircularProgress size={24} />
              ) : (
                <DeleteIcon />
              )}
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Dialog
        open={deleteConfirmationOpen}
        onClose={cancelDeleteCategory}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteCategory} color="primary" variant="contained">
            Cancel
          </Button>
          <Button onClick={confirmDeleteCategory} color="primary" variant="contained" autoFocus>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AllCategories;
