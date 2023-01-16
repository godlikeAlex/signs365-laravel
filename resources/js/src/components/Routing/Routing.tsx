import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  Cart,
  EditProfile,
  ForgotPassword,
  Home,
  Login,
  ModalShowProduct,
  Profile,
  Register,
  ResetPassword,
} from "@/src/Pages";
import ProtectedRoute from "../ProtectedRoute";
import Layout from "../Layout";

function Routing() {
  const location = useLocation();
  let state = location.state as { backgroundLocation?: Location };

  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="cart" element={<Cart />} />

          <Route element={<ProtectedRoute allowAuthed={true} />}>
            <Route path="profile" element={<Profile />} />
            <Route path="profile/edit" element={<EditProfile />} />
            <Route path="profile/orders" element={<Home />} />
          </Route>

          <Route element={<ProtectedRoute allowAuthed={false} />}>
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route
              path="auth/reset-password/:token"
              element={<ResetPassword />}
            />
          </Route>
        </Route>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/product/:slug" element={<ModalShowProduct />} />
        </Routes>
      )}
    </>
  );
}

export default Routing;
