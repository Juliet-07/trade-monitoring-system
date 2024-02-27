import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardRoute from "./DashboardRoute";
import FormA from "./pages/admin/formA";
import FormNCP from "./pages/admin/formNCP";
import FormNXP from "./pages/admin/formNXP";
import AdminPage from "./pages/admin/landingPage";
import UserPage from "./pages/admin/userPage";
import Login from "./pages/login";
import LandingPage from "./pages/reviewer/landingPage";
import SupervisorFormA from "./pages/supervisor/formA";
import FormADetails from "./pages/supervisor/formADetails";
import SupervisorFormNCX from "./pages/supervisor/formNCX";
import SupervisorFormNXP from "./pages/supervisor/landingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/formA" element={<FormA />} />
      <Route path="/admin/formNcx" element={<FormNCP />} />
      <Route path="/admin/formNxp" element={<FormNXP />} />
      <Route path="/userPage/:id" element={<UserPage />} />
      <Route path="/reviewer/formNxp" element={<LandingPage />} />
      <Route path="/supervisor/formNxp" element={<SupervisorFormNXP />} />
      <Route path="/supervisor/formA" element={<SupervisorFormA />} />
      <Route path="/supervisor/formADetails/:id" element={<FormADetails />} />
      <Route path="/supervisor/formNcx" element={<SupervisorFormNCX />} />
    </Routes>
  );
}
export default App;
