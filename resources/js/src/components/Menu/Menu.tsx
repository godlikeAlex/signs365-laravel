import { useAppSelector } from "@/src/hooks";
import React from "react";
import { Link } from "react-router-dom";

interface Props {}

const Menu: React.FC<Props> = ({}: Props) => {
  const { isAuthed, user } = useAppSelector((state) => state.auth);

  return (
    <>
      <Link to={"/"}>Home</Link>

      {isAuthed && user ? (
        <Link to={"/profile"} style={{ marginLeft: 20 }}>
          Profile
        </Link>
      ) : (
        <>
          <Link to={"/login"} style={{ marginLeft: 20 }}>
            Login
          </Link>
          <Link to={"/register"} style={{ marginLeft: 20 }}>
            Register
          </Link>
        </>
      )}
    </>
  );
};

export default Menu;
