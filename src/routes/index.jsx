import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import UnProtectedRoutes from "./UnProtectedRoutes";
import Signup from "../Pages/AuthFlow/Signup";
import Login from "../Pages/AuthFlow/Login";
import ForgotPassword from "../Pages/AuthFlow/ForgotPassword";
import Dashboard from "../Pages/mainflow/Dashboard/Dashboard";
import Layout from "../Component/Layout/Layout";

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
        </>
      }
    </Routes>
    </Layout>
  );
};

export default RoutesIndex;
