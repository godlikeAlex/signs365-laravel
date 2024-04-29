import React, { useEffect } from "react";
import "./style.css";
import { router, usePage } from "@inertiajs/react";
import { SharedInertiaData } from "@/src/types/inertiaTypes";
import route from "ziggy-js";
import classNames from "classnames";
import { Ziggy } from "@/ziggy";

interface Props {}

const SocialFixedButtons: React.FC<Props> = ({}: Props) => {
  const socialFixedRef = React.useRef<HTMLUListElement>();
  const sharedData = usePage<SharedInertiaData>().props;

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const screen = e.currentTarget as Window;

      if (route(undefined, undefined, undefined, Ziggy).current() !== "home") {
        socialFixedRef.current.classList.remove("active-right");
        return;
      }

      if (screen.scrollY > 220) {
        socialFixedRef.current.classList.remove("active-right");
      } else {
        socialFixedRef.current.classList.add("active-right");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ul
      className={classNames("social-fixed-btns", {
        "active-right":
          route(undefined, undefined, undefined, Ziggy).current() === "home",
      })}
      ref={socialFixedRef}
    >
      <li>
        <a href="mailto:info@signs.com">
          <div className="icon-box-social">
            <i className="fas fa-envelope"></i>
          </div>
          <span>E-Mail</span>
        </a>
      </li>
      <li>
        <a href="https://api.whatsapp.com/send?phone=123123">
          <div className="icon-box-social">
            <i className="fab fa-whatsapp"></i>
          </div>
          <span>WhatsApp</span>
        </a>
      </li>
      <li>
        <a href="tel:+1">
          <div className="icon-box-social">
            <i aria-hidden="true" className="fas fa-phone"></i>
          </div>
          <span>Call us</span>
        </a>
      </li>

      <li>
        <a href="tel:+1">
          <div className="icon-box-social">
            <i aria-hidden="true" className="fab fa-instagram"></i>
          </div>
          <span>Instagram</span>
        </a>
      </li>
    </ul>
  );
};

export default SocialFixedButtons;
