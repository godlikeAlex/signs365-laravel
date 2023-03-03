import React, { useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useResolvedPath,
  matchPath,
  Navigate,
} from "react-router-dom";
import {
  Cart,
  Checkout,
  EditProfile,
  ForgotPassword,
  Home,
  Login,
  ModalShowProduct,
  Profile,
  Register,
  ResetPassword,
  SuccessPayment,
} from "@/src/Pages";
import ProtectedRoute from "../ProtectedRoute";
import Layout from "../Layout";

function Routing() {
  const location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  console.log(state, location);

  useEffect(() => {
    // console.log(currentPath, "ker");
    // console.log(location);
    // navigate("/login");
    if (!location.state) {
      try {
        const { params, pattern, pathname } = matchPath(
          "/product/:slug",
          location.pathname
        );
        console.log(pattern, params, pathname);
        navigate("/login");
      } catch (error) {}
    }
  }, [location]);

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="home/*" element={<Home />}>
            <Route path="product/modal/:slug" element={<ModalShowProduct />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="cart" element={<Cart />} />

          <Route path="/cart/checkout" element={<Checkout />} />

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

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/home/product/modal/:slug"
            element={<ModalShowProduct />}
          />
        </Routes>
      )}
    </>
  );
}

export default Routing;
