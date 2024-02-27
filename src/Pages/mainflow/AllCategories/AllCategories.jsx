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
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  addCategories,
  deleteCategory,
} from "../../../redux/actions/categoriesActions";
import MuiAlert from "@mui/material/Alert";
import { addCategoriesError } from "../../../redux/reducers/categoriesReducer";

const AllCategories = () => {
  const [category, setCategory] = useState("");
  const userId = useSelector((state) => state.auth.user.uid);
  const isLoading = useSelector((state) => state.categories.isLoading);
  const newCategories = useSelector((state) => state.categories.category);
  let categoriesError = useSelector((state) => state.categories.error);
  const dispatch = useDispatch();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (categoriesError) {
      setSnackbarMessage(categoriesError);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      dispatch(addCategoriesError(""));
    }
  }, [categoriesError]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addCategories(category, userId, newCategories));
    setCategory("");
    setSnackbarMessage("Category added successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleDeleteCategory = (categoryName) => {
    dispatch(deleteCategory(categoryName, userId, newCategories));
    setSnackbarMessage("Category deleted successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
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
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "ADD NEW CATEGORY"}
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
              >
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default AllCategories;
