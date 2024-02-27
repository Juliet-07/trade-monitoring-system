import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/reviewer/Layout";
import Reviewer from "./pages/reviewer/landingPage";

const DashboardRoute = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/reviewer" element={<Reviewer />} />
      </Routes>
    </Layout>
  );
};
export default DashboardRoute;
