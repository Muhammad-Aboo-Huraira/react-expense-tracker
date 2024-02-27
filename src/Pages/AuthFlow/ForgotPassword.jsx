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
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { passwordReset, isEmailAlreadyRegistered } from "../../redux/actions/authActions";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .test('is-registered', 'Email is not registered', async function (value) {
      try {
        
        const isRegistered = await isEmailAlreadyRegistered(value);
        console.log(isRegistered)
        return isRegistered;
      } catch (error) {
        console.error("Error checking email registration:", error);
        return false;
      }
    }),
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

const ForgotPassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);

const [openSnackbar, setOpenSnackbar] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(passwordReset(values.email));
        formik.resetForm();
        setSnackbarMessage("Reset email sent successfully!");
        setOpenSnackbar(true);
      } catch (error) {
        console.error("Password reset error:", error);
      }
    },
  });

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h1" gutterBottom>
        Reset Password
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="email-input">Email address</InputLabel>
          <Input
            id="email-input"
            type="email"
            name="email"
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
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
          disabled={isLoading} 
        >
          {isLoading ? (
            <CircularProgress size={24} className={classes.loader} />
          ) : (
            "Reset"
          )}
        </Button>
      </form>
      <Typography className={classes.link}>
        Go{" "}
        <Link component={RouterLink} to="/">
          Back
        </Link>
        !
      </Typography>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Paper>
  );
};

export default ForgotPassword;
