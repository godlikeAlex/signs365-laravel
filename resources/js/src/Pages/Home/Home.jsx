import { login } from "@/src/redux/authSlice";
import React from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  dispatch(login({ email: "godlikedesigner@gmail.com", password: "5261438s" }));

  return <h1>Homies</h1>;
}
