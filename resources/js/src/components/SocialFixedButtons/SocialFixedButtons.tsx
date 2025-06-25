import React, { useEffect } from "react";
import "./style.css";
import { router, usePage } from "@inertiajs/react";
import { SharedInertiaData } from "@/src/types/inertiaTypes";
import route from "ziggy-js";
import classNames from "classnames";
import { Ziggy } from "@/ziggy";

interface Props {}

const excludePages = ["/cart", "/checkout"];

const SocialFixedButtons: React.FC<Props> = ({}: Props) => {
  const socialFixedRef = React.useRef<HTMLUListElement>();
  // const sharedData = usePage<SharedInertiaData>().props;
  const pageData = usePage<SharedInertiaData>();

  const isHomePage = pageData.url === "/";

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const screen = e.currentTarget as Window;

      if (isHomePage) {
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
  }, [isHomePage]);

  if (pageData.url === "/cart" || pageData.url === "/checkout") {
    return;
  }
  return (
    <>
      <ul
        className={classNames("social-fixed-btns", {
          "active-right": !isHomePage,
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
          <a
            href="https://api.whatsapp.com/send?phone=13473302455"
            target="_blank"
          >
            <div className="icon-box-social">
              <i className="fab fa-whatsapp"></i>
            </div>
            <span>WhatsApp</span>
          </a>
        </li>
        <li>
          <a href="tel:+13072008927">
            <div className="icon-box-social">
              <i aria-hidden="true" className="fas fa-phone"></i>
            </div>
            <span>Call us</span>
          </a>
        </li>

        {/* <li>
        <a href="https://www.instagram.com/easywayinstall/" target="_blank">
          <div className="icon-box-social">
            <i aria-hidden="true" className="fab fa-instagram"></i>
          </div>
          <span>Instagram</span>
        </a>
      </li> */}
      </ul>

      <div className="mobile-call-to-action" style={{ zIndex: 999 }}>
        <div
          className="mobile-call-to-action__item mobile-call-to-action__item-wa"
          style={{ background: "#00a79d" }}
        >
          <a href="tel:+13072008927" target="_blank" rel="noopener">
            <i
              className="fa fa-phone"
              style={{ fontSize: "25px" }}
              aria-hidden="true"
            ></i>
            <br />
            Call us
          </a>
        </div>
        <div
          className="mobile-call-to-action__item mobile-call-to-action__item-wa"
          style={{ background: "#1bdb1b" }}
        >
          <a
            href="https://api.whatsapp.com/send?phone=13473302455"
            target="_blank"
            rel="noopener"
          >
            <i
              className="fab fa-whatsapp"
              style={{ fontSize: "25px" }}
              aria-hidden="true"
            ></i>{" "}
            <br />
            Whatsapp
          </a>
        </div>

        <div
          className="mobile-call-to-action__item mobile-call-to-action__item-wa"
          style={{ background: "#384259" }}
        >
          <a href="mailto:info@signs.com" target="_blank" rel="noopener">
            <i
              className="fas fa-envelope"
              style={{ fontSize: "25px" }}
              aria-hidden="true"
            ></i>{" "}
            <br />
            Email us
          </a>
        </div>
      </div>
    </>
  );
};

export default SocialFixedButtons;
