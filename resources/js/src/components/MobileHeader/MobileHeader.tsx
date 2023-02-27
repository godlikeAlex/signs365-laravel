import classNames from "classnames";
import React, { useState } from "react";

interface MobileHeaderProps {}

const MobileHeader: React.FC<MobileHeaderProps> = ({}: MobileHeaderProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <>
      <header className="ps-header ps-header--6 ps-header--mobile">
        <div className="ps-header__middle">
          <div className="container">
            <div className="ps-logo">
              <a href="index.html">
                {" "}
                <img src="/img/mobile-logo.png" alt="" />
              </a>
            </div>
            <div className="ps-header__right">
              <ul className="ps-header__icons">
                <li>
                  <a
                    className="ps-header__item menu-slide"
                    href="#"
                    onClick={() => setShowMenu(true)}
                  >
                    <i className="fa fa-bars"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <div
        className={classNames("ps-menu--slidebar has-close-icon", {
          active: showMenu,
        })}
      >
        <a
          href="#"
          id="close-menu"
          className="ic-mobile-menu-close-button close-menu"
          onClick={() => setShowMenu(false)}
        >
          <i className="icon-cross"></i>
        </a>
        <div className="ps-menu__content">
          <ul className="menu--mobile">
            <li>
              <a href="{{route('home', app()->getLocale())}}">Hello</a>
            </li>
          </ul>
        </div>
        <div className="ps-menu__footer">
          <div className="ps-menu__item">
            <div className="ps-menu__contact">
              <br />
              <a href="tel:+998999010033" style={{ color: "#103178" }}>
                <strong>+998 99 901 00 33</strong>
              </a>
              <br />
              <a href="tel:+998974243004" style={{ color: "#103178" }}>
                <strong>+998 97 424 30 04</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
