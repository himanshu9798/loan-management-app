import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./user/Home";
import AdHome from "./admin/AdHome";
import ManHome from "./manager/ManHome";
import App from "./App";
import Registration from "./component/Registration";
import ApplyLoan from "./user/ApplyLoan";
import UserLoan from "./user/UserLoan";
import EMICalculator from "./user/EMICalculator";
import AccountSettings from "./user/AccountSettings";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/user" element={<Home />} />
      <Route path="/admin" element={<AdHome />} />
      <Route path="/manager" element={<ManHome />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/apply-loan" element={<ApplyLoan />} />
      <Route path="/my-loans" element={<UserLoan />} />
      <Route path="/account-settings" element={<AccountSettings />} />
      <Route path="/emi-calculator" element={<EMICalculator />} />
    </Routes>
  );
}

export default AppRouter;
