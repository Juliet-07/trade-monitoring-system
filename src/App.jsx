import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardRoute from "./DashboardRoute";
import FormA from "./pages/admin/formA";
import FormNCP from "./pages/admin/formNCP";
import FormNXP from "./pages/admin/formNXP";
import AdminPage from "./pages/admin/landingPage";
import Login from "./pages/login";
import LandingPage from "./pages/reviewer/landingPage";
import SupervisorLandingPage from "./pages/supervisor/landingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/formA" element={<FormA />} />
      <Route path="/admin/formNcp" element={<FormNCP />} />
      <Route path="/admin/formNxp" element={<FormNXP />} />
      <Route path="/reviewer/formNxp" element={<LandingPage />} />
      <Route path="/supervisor/formNxp" element={<SupervisorLandingPage />} />
    </Routes>
  );
}
export default App;
