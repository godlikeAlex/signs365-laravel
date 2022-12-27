import { Home, Login } from "@/src/Pages";
import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute allowAuthed={true} />}>
        <Route path="profile" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default Routing;
