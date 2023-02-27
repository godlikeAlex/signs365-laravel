import { ModalShowProduct } from "@/src/Pages";
import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Menu from "../Menu";
import MobileHeader from "../MobileHeader";

interface Props {}

const Layout: React.FC<Props> = ({}: Props) => {
  return (
    <div className="ps-page">
      <Menu />
      <MobileHeader />

      <div className="main">
        <Outlet />
      </div>

      <footer>signs365</footer>
    </div>
  );
};

export default Layout;
