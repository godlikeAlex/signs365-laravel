import {
  Footer,
  Menu,
  MobileHeader,
  SocialFixedButtons,
} from "@/src/components";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<Props> = ({ children }: Props) => {
  return (
    <>
      <div className="ps-page">
        <Menu />
        <MobileHeader />
        <SocialFixedButtons />

        <div className="main">{children}</div>

        <Footer />
      </div>

      <ToastContainer />
    </>
  );
};

export default DefaultLayout;
