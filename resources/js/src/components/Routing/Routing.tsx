// import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {
  Cart,
  Catalog,
  Checkout,
  EditProfile,
  ForgotPassword,
  Home,
  Login,
  ModalShowProduct,
  NotFound,
  ProductShow,
  Profile,
  Register,
  ResetPassword,
  SuccessPayment,
} from "@/src/Pages";
import ProtectedRoute from "../ProtectedRoute";
import Layout from "../Layout";
import { useMediaQuery } from "react-responsive";
import ShowProduct from "../ShowProduct/ShowProduct";

function Routing() {
  const location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="*" element={<NotFound />} />

          <Route path="home/*" element={<Home />}>
            <Route path="product/modal/:slug" element={<ModalShowProduct />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="cart" element={<Cart />} />

          <Route path="/cart/checkout" element={<Checkout />} />

          <Route path="/catalog/:categorySlug" element={<Catalog />} />

          <Route path="catalog/product/:slug" element={<ProductShow />} />

          <Route
            path="/cart/checkout/success-payment"
            element={<SuccessPayment />}
          />

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

      {background && (
        <Routes>
          <Route
            path="home/product/modal/:slug"
            element={<ModalShowProduct />}
          />
        </Routes>
      )}
    </>
  );
}

export default Routing;
