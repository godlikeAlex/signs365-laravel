import { useAppDispatch } from "@/src/hooks";
import { logoutUser } from "@/src/redux/authSlice";
import React from "react";

interface Props {}

const Profile: React.FC<Props> = ({}: Props) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <h1>Profile</h1>

      <button onClick={() => dispatch(logoutUser())}>LOG OUT</button>
    </>
  );
};

export default Profile;
