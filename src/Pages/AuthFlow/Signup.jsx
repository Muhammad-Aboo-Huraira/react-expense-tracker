import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  CircularProgress,
  Button,
  makeStyles,
  Typography,
  Paper,
  Link,
  Snackbar,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  isEmailAlreadyRegistered,
  signUp,
} from "../../redux/actions/authActions";
import { useFormik } from "formik";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .test(
      "is-registered",
      "Email is already in use, please try different email.",
      async function (value) {
        try {
          const isRegistered = await isEmailAlreadyRegistered(value);
          return !isRegistered;
        } catch (error) {
          console.error("Error checking email registration:", error);
          return false;
        }
      }
    ),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3),
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
    borderRadius: 8,
    boxSizing: "border-box",
    width: "400px",
  },
  formControl: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(2),
    width: "100%",
    minHeight: "100%",
    position: "relative",
  },
  loader: {
    position: "relative",
    margin: "auto",
    color: "white",
  },
  link: {
    marginTop: theme.spacing(2),
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "transparent", // Remove hover background color
    },
    "&:focus": {
      outline: "none",
    },
    "&:active": {
      backgroundColor: "transparent", // Remove click background color
    },
  },
}));

const Signup = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(
          signUp(values.username, values.email, values.password, navigate)
        );
        formik.resetForm();
        setSnackbarMessage("Signed up successfully!");
        setOpenSnackbar(true);
      } catch (error) {
        console.error("Sign-up error:", error);
      }
    },
  });

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h1" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="username-input">Username</InputLabel>
          <Input
            id="username-input"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
          />
          {formik.touched.username && formik.errors.username && (
            <Typography variant="body2" color="error">
              {formik.errors.username}
            </Typography>
          )}
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="email-input">Email address</InputLabel>
          <Input
            id="email-input"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
          {formik.touched.email && formik.errors.email && (
            <Typography variant="body2" color="error">
              {formik.errors.email}
            </Typography>
          )}
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="password-input">Password</InputLabel>
          <Input
            id="password-input"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  className={classes.iconButton}
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {formik.touched.password && formik.errors.password && (
            <Typography variant="body2" color="error">
              {formik.errors.password}
            </Typography>
          )}
        </FormControl>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          {isLoading ? (
            <CircularProgress size={24} className={classes.loader} />
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
      <Typography className={classes.link}>
        Already have an account?{" "}
        <Link component={RouterLink} to="/">
          Login
        </Link>
      </Typography>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Paper>
  );
};

export default Signup;
