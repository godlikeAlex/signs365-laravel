import React from "react";
import { useAppSelector } from "@/src/hooks";
import { Navigate, Outlet } from "react-router-dom";

export const BASE_FOR_NOT_AUTHED_REDIRECT = "/login";
export const BASE_FOR_AUTHED_REDIRECT = "/profile";

const ProtectedRoute = ({ allowAuthed = true }) => {
  const { isAuthed } = useAppSelector((state) => state.auth);

  if (allowAuthed && isAuthed === false) {
    return <Navigate to={BASE_FOR_NOT_AUTHED_REDIRECT} replace />;
  }

  if (allowAuthed === false && isAuthed) {
    return <Navigate to={BASE_FOR_AUTHED_REDIRECT} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
