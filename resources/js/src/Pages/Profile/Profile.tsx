import { useAppDispatch } from "@/src/hooks";
import { logoutUser } from "@/src/redux/authSlice";
import React from "react";
import { Link } from "react-router-dom";

interface Props {}

const Profile: React.FC<Props> = ({}: Props) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <h1>Profile</h1>
      <Link to={"/profile/edit"}>Edit</Link>
      <button onClick={() => dispatch(logoutUser())}>LOG OUT</button>
    </>
  );
};

export default Profile;
