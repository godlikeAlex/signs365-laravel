import { Home, Login, Profile, Register } from "@/src/Pages";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Menu from "../Menu";
import ProtectedRoute from "../ProtectedRoute";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute allowAuthed={true} />}>
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default Routing;
