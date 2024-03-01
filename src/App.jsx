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
import DaemonFormNCXDetails from "./pages/daemon/formNCXDetails";
import DaemonFormNXPDetails from "./pages/daemon/formNXPDetails";
import DaemonFormNXP from "./pages/daemon/landingPage";
import DBS_ReviewerFormA from "./pages/disbursementReviewer/formA";
import DBS_ReviewerFormADetails from "./pages/disbursementReviewer/formADetails";
import DBS_SupervisorFormA from "./pages/disbursementSupervisor/formA";
import DBS_SupervisorFormADetails from "./pages/disbursementSupervisor/formADetails";
import Login from "./pages/login";
import ReviewerFormA from "./pages/reviewer/formA";
import ReviewerFormADetails from "./pages/reviewer/formADetails";
import ReviewerFormNCX from "./pages/reviewer/formNCX";
import ReviewerFormNCXDetails from "./pages/reviewer/formNcxDetails";
import ReviewerFormNxpDetails from "./pages/reviewer/formNxpDetails";
import ReviewerFormNXP from "./pages/reviewer/landingPage";
import SupervisorFormA from "./pages/supervisor/formA";
import SupervisorFormADetails from "./pages/supervisor/formADetails";
import SupervisorFormNCX from "./pages/supervisor/formNCX";
import SupervisorFormNCXDetails from "./pages/supervisor/formNcxDetails";
import SupervisorFormNxpDetails from "./pages/supervisor/formNxpDetails";
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
      <Route
        path="/Daemon-formNcxDetails/:id"
        element={<DaemonFormNCXDetails />}
      />
      <Route path="/reviewer/formNxp" element={<ReviewerFormNXP />} />
      <Route
        path="/Reviewer-formNxpDetails/:id"
        element={<ReviewerFormNxpDetails />}
      />
      <Route path="/reviewer/formA" element={<ReviewerFormA />} />
      <Route
        path="/Reviewer-formADetails/:id"
        element={<ReviewerFormADetails />}
      />
      <Route path="/reviewer/formNcx" element={<ReviewerFormNCX />} />
      <Route
        path="/Reviewer-formNcxDetails/:id"
        element={<ReviewerFormNCXDetails />}
      />
      <Route path="/supervisor/formNxp" element={<SupervisorFormNXP />} />
      <Route
        path="/supervisor/formNxpDetails/:id"
        element={<SupervisorFormNxpDetails />}
      />
      <Route path="/supervisor/formA" element={<SupervisorFormA />} />
      <Route
        path="/supervisor/formADetails/:id"
        element={<SupervisorFormADetails />}
      />
      <Route path="/supervisor/formNcx" element={<SupervisorFormNCX />} />
      <Route
        path="/supervisor/formNcxDetails/:id"
        element={<SupervisorFormNCXDetails />}
      />
      <Route path="/dbs_supervisor/formA" element={<DBS_SupervisorFormA />} />
      <Route
        path="/dbs_supervisor/formADetails/:id"
        element={<DBS_SupervisorFormADetails />}
      />
      <Route path="/dbs_reviewer/formA" element={<DBS_ReviewerFormA />} />
      <Route
        path="/dbs_reviewer/formADetails/:id"
        element={<DBS_ReviewerFormADetails />}
      />
    </Routes>
  );
}
export default App;
