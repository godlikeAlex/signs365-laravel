import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { isAuthed, authChecked } = useSelector((state) => state.auth);

  useEffect(() => {}, [isAuthed, authChecked]);
}
