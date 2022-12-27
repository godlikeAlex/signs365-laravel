import { Home, Login, Register } from "@/src/Pages";
import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute allowAuthed={true} />}>
        <Route path="profile" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default Routing;
