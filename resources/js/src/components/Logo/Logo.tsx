import SVGLogo from "@/assets/images/logo.svg";
import { Link } from "@inertiajs/react";
import classes from "./Logo.module.scss";

export default function Logo() {
  return (
    <div className={classes.logoContainer}>
      <img src={SVGLogo} className={classes.logo} alt="Signs" />

      <div className={classes.logoQuote}>
        Project. <br /> Solutions. <br /> Partner.
      </div>
    </div>
  );
}
