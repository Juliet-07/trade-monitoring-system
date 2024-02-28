import React from "react";
import { Route, Routes } from "react-router-dom";
import FormA from "./pages/admin/formA";
import FormNCP from "./pages/admin/formNCP";
import FormNXP from "./pages/admin/formNXP";
import AdminPage from "./pages/admin/landingPage";
import UserPage from "./pages/admin/userPage";
import DaemonFormA from "./pages/daemon/formA";
import DaemonFormADetails from "./pages/daemon/formADetails";
import DaemonFormNCX from "./pages/daemon/formNCX";
import DaemonFormNXPDetails from "./pages/daemon/formNXPDetails";
import DaemonFormNXP from "./pages/daemon/landingPage";
import Login from "./pages/login";
import ReviewerFormA from "./pages/reviewer/formA";
import ReviewerFormNCX from "./pages/reviewer/formNCX";
import ReviewerFormNXP from "./pages/reviewer/landingPage";
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
      <Route path="/daemon/formNxp" element={<DaemonFormNXP />} />
      <Route
        path="/Daemon-formNXPDetails/:id"
        element={<DaemonFormNXPDetails />}
      />
      <Route path="/daemon/formA" element={<DaemonFormA />} />
      <Route path="/Daemon-formADetails/:id" element={<DaemonFormADetails />} />
      <Route path="/daemon/formNcx" element={<DaemonFormNCX />} />
      <Route path="/reviewer/formNxp" element={<ReviewerFormNXP />} />
      <Route path="/reviewer/formA" element={<ReviewerFormA />} />
      <Route path="/reviewer/formNcx" element={<ReviewerFormNCX />} />
      <Route path="/supervisor/formNxp" element={<SupervisorFormNXP />} />
      <Route path="/supervisor/formA" element={<SupervisorFormA />} />
      <Route path="/supervisor/formADetails/:id" element={<FormADetails />} />
      <Route path="/supervisor/formNcx" element={<SupervisorFormNCX />} />
    </Routes>
  );
}
export default App;
