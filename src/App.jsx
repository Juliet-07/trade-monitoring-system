import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardRoute from "./DashboardRoute";
import AdminPage from "./pages/admin/landingPage";
import Login from "./pages/login";
import LandingPage from "./pages/reviewer/landingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/reviewer/profile" element={<LandingPage />} />
    </Routes>
  );
}
export default App;
