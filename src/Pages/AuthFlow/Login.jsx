import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
  Paper,
  Link,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmailAlreadyRegistered, signIn } from "../../redux/actions/authActions";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .test(
      "is-registered",
      "Email is not registered, Sign Up!",
      async function (value) {
        try {
          const isRegistered = await isEmailAlreadyRegistered(value);
          return isRegistered;
        } catch (error) {
          console.error("Error checking email registration:", error);
          return false;
        }
      }
    ),
  password: yup
    .string()
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
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const loginError = useSelector((state) => state.auth.error);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(signIn(values.email, values.password, navigate));
        formik.resetForm();
        if (loginError === "Incorrect email or password.") {
          setSnackbarMessage("Incorrect email or password.");
          setOpenSnackbar(true);
        } else {
          setSnackbarMessage("Logged in successfully!");
          setOpenSnackbar(true);
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    },
  });
  

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={formik.handleSubmit}>
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
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
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
            "Login"
          )}
        </Button>
      </form>
      <Typography className={classes.link}>
        Do not have an account?{" "}
        <Link component={RouterLink} to="/signup">
          Sign Up
        </Link>
      </Typography>
      <Typography className={classes.link}>
        Forgot Password?{" "}
        <Link component={RouterLink} to="/forgotpassword">
          Reset
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

export default Login;
