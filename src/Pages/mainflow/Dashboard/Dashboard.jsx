import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Paper,
  Box,
  Container,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { PieChart } from "@mui/x-charts/PieChart";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#f0f0f0", // Light gray background color
    borderRadius: theme.spacing(1), // Rounded corners
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Shadow effect
    transition: "transform 0.3s", // Smooth scaling effect on hover
    "&:hover": {
      transform: "scale(1.05)", // Scale up by 5% on hover
    },
  },
  cardContent: {
    textAlign: "center",
    height: 150, // Fixed height for card content
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  paper: {
    backgroundColor: "#f0f0f0", // Light gray background color
    borderRadius: theme.spacing(1), // Rounded corners
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Shadow effect
    transition: "transform 0.3s", // Smooth scaling effect on hover
    padding: theme.spacing(2), // Padding for content
    textAlign: "center",
    marginBottom: theme.spacing(3), // Margin bottom for spacing
  },
  chartContainer: {
    height: 200, // Define the height of the chart container
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const newAccounts = useSelector((state) => state.accounts.account);
  const cashAmount =
    newAccounts.find((accountItem) => accountItem.accountName === "Cash")
      ?.amount || 0;
  const savingsAmount =
    newAccounts.find((accountItem) => accountItem.accountName === "Savings")
      ?.amount || 0;

  // Calculate banks amount by summing amounts of all accounts except Cash and Savings
  const banksAmount = newAccounts
    .filter(
      (accountItem) =>
        accountItem.accountName !== "Cash" &&
        accountItem.accountName !== "Savings"
    )
    .reduce(
      (total, accountItem) => parseInt(total) + parseInt(accountItem.amount),
      0
    );

  // Assuming user data is available in Redux state
  const username = useSelector((state) => state.auth.user.username);
  const transactionsData = useSelector(
    (state) => state.transactions.transactionsData
  );
  // Calculate total income and expense amounts
  const incomeAmount = transactionsData.reduce((total, transaction) => {
    return transaction.transactionType === "Income"
      ? total + transaction.amount
      : total;
  }, 0);

  const expenseAmount = transactionsData.reduce((total, transaction) => {
    return transaction.transactionType === "Expense"
      ? total + transaction.amount
      : total;
  }, 0);
  const totalAmount = banksAmount + cashAmount + savingsAmount;
  return (
    <Container
      maxWidth="md"
      sx={{ maxWidth: "800px !important", minWidth: "800px !important" }}
    >
      {/* Greeting Paper */}
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Welcome, {username}!
        </Typography>
        <Typography variant="body1">
          We're glad to see you here. Explore your dashboard to manage your
          finances. You have
        </Typography>
        <Typography variant="h6" gutterBottom>
          Total Amount
        </Typography>
        <Typography variant="h4">Rs. {totalAmount.toLocaleString()}</Typography>
      </Paper>
      {/* Dashboard Cards */}
      <Grid container spacing={3}>
        {/* Cash Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h6" gutterBottom>
                Cash
              </Typography>
              <Typography variant="h4">
                Rs. {cashAmount.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Bank Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h6" gutterBottom>
                Banks
              </Typography>
              <Typography variant="h4">
                Rs. {banksAmount.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Savings Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h6" gutterBottom>
                Savings
              </Typography>
              <Typography variant="h4">
                Rs. {savingsAmount.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <br />
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        sx={{ height: "200px", textAlign: "center" }}
      >
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Transactions Chart
          </Typography>
          <span
            style={{
              backgroundColor: "green",
              borderRadius: "10px",
              padding: "3px",
              margin: "5px",
            }}
          >
            Income
          </span>
          <span
            style={{
              backgroundColor: "red",
              borderRadius: "10px",
              padding: "3px",
              margin: "5px",
            }}
          >
            Expense
          </span>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "200px",
              width: "300px",
            }}
          >
            {transactionsData.length === 0 ? (
              <Typography>Perform transactions to see donut chart</Typography>
            ) : (
              <PieChart
                series={[
                  {
                    data: [
                      { name: "Income", value: incomeAmount },
                      { name: "Expense", value: expenseAmount },
                    ],
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    cx: "80%",
                    cy: "50%",
                  },
                ]}
                colors={["green", "red"]}
              />
            )}
          </Box>
        </Paper>
      </Grid>
    </Container>
  );
};

export default Dashboard;
