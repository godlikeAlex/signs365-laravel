import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "@/src/Pages";
import ProtectedRoute from "../ProtectedRoute";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Home />} />

      <Route element={<ProtectedRoute allowAuthed={true} />}>
        <Route path="profile" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default Routing;
