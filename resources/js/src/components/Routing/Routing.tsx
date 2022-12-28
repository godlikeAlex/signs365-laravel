import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  ForgotPassword,
  Home,
  Login,
  Profile,
  Register,
  ResetPassword,
} from "@/src/Pages";
import ProtectedRoute from "../ProtectedRoute";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute allowAuthed={true} />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route element={<ProtectedRoute allowAuthed={false} />}>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
}

export default Routing;
