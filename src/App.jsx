import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Reviewer from "./pages/reviewer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/reviewer" element={<Reviewer />} />
    </Routes>
  );
}
export default App;
