import { useAppSelector } from "@/src/hooks";
import classNames from "classnames";
import React, { useState } from "react";

import "./style.css";
import { SharedInertiaData } from "@/src/types/inertiaTypes";
import { Link, usePage } from "@inertiajs/react";

interface MobileHeaderProps {}

const MobileHeader: React.FC<MobileHeaderProps> = ({}: MobileHeaderProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { homeCategories, cart, auth } = usePage<SharedInertiaData>().props;

  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <header className="ps-header ps-header--6 ps-header--mobile">
        <div className="ps-header__middle">
          <div className="container">
            <div className="ps-logo">
              <a href="/">
                {" "}
                <img src="/img/logo.png" alt="" style={{ width: 80 }} />
              </a>
            </div>
            <div className="ps-header__right">
              <ul className="ps-header__icons">
                <li>
                  <a
                    className="ps-header__item menu-slide"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowMenu(true);
                    }}
                  >
                    <i className="fa-solid fa-bars"></i>
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
          onClick={(e) => {
            e.preventDefault();
            setShowMenu(false);
          }}
        >
          <i className="icon-cross"></i>
        </a>
        <div className="ps-menu__content">
          <ul className="menu--mobile">
            <li>
              <Link onClick={closeMenu} href={"/"}>
                Home
              </Link>
            </li>

            <div className="divider" />

            {homeCategories.map((category) => (
              <li key={category.id}>
                <Link
                  onClick={closeMenu}
                  href={`/shop/category/${category.slug}`}
                >
                  {category.title}
                </Link>
              </li>
            ))}

            <div className="divider" />

            <li>
              <Link onClick={closeMenu} href={"/cart"}>
                Shopping Cart | {cart.items.length}
              </Link>
            </li>

            {auth.user ? (
              <>
                <li>
                  <Link onClick={closeMenu} href={"/profile"}>
                    Profile
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link onClick={closeMenu} href={"/login"}>
                    Login
                  </Link>
                </li>

                <li>
                  <Link onClick={closeMenu} href={"/register"}>
                    Create account
                  </Link>
                </li>
              </>
            )}
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
                <strong>info@sign7.com</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
