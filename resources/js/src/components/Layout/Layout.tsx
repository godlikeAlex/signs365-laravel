import { ModalShowProduct } from "@/src/Pages";
import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Footer from "../Footer";
import Menu from "../Menu";
import MobileHeader from "../MobileHeader";
import SocialFixedButtons from "../SocialFixedButtons";

interface Props {}

const Layout: React.FC<Props> = ({}: Props) => {
  return (
    <div className="ps-page">
      <Menu />
      <MobileHeader />
      <SocialFixedButtons />

      <div className="main">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
