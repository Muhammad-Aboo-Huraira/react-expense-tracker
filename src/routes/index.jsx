import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import UnProtectedRoutes from "./UnProtectedRoutes";
import Signup from "../Pages/AuthFlow/Signup";
import Login from "../Pages/AuthFlow/Login";
import ForgotPassword from "../Pages/AuthFlow/ForgotPassword";
import Dashboard from "../Pages/MainFlow/Dashboard/Dashboard";
import Layout from "../Layout/Layout";
import AllAccounts from "../Pages/MainFlow/AllAccounts/AllAccounts";
import AllCategories from "../Pages/MainFlow/AllCategories/AllCategories";
import PerformTransactions from "../Pages/MainFlow/PerformTransaction/PerformTransactions";
import AllTransactions from "../Pages/MainFlow/AllTransactions/AllTransactions";

const RoutesIndex = () => {
  return (
    <Layout>
    <Routes>
      {
        <>
          <Route path="/" element={<UnProtectedRoutes Component={Login} />} />
          <Route path="/signup" element={<UnProtectedRoutes Component={Signup} />} />
          <Route path="/forgotpassword" element={<UnProtectedRoutes Component={ForgotPassword} />} />
          <Route path="/dashboard" element={<ProtectedRoutes Component={Dashboard} />} />
          <Route path="/allaccounts" element={<ProtectedRoutes Component={AllAccounts} />} />
          <Route path="/allcategories" element={<ProtectedRoutes Component={AllCategories} />} />
          <Route path="/performtransaction" element={<ProtectedRoutes Component={PerformTransactions} />} />
          <Route path="/alltransactions" element={<ProtectedRoutes Component={AllTransactions} />} />
        </>
      }
    </Routes>
    </Layout>
  );
};

export default RoutesIndex;
