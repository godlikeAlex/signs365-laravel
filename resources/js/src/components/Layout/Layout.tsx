import { ModalShowProduct } from "@/src/Pages";
import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Menu from "../Menu";

interface Props {}

const Layout: React.FC<Props> = ({}: Props) => {
  return (
    <>
      <Menu />

      <div className="main">
        <Outlet />
      </div>

      <footer>signs365</footer>
    </>
  );
};

export default Layout;
