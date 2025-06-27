import { useAppSelector } from "@/src/hooks";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";

import "./style.css";
import { SharedInertiaData } from "@/src/types/inertiaTypes";
import { Link, usePage } from "@inertiajs/react";

import CartIcon from "@/assets/icons/SMALL/cart.svg?react";

import SVGLogo from "@/assets/images/logo.svg";
import { useSticky } from "@/src/hooks/useSticky";

interface MobileHeaderProps {}

const MobileHeader: React.FC<MobileHeaderProps> = ({}: MobileHeaderProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { homeCategories, cart, auth } = usePage<SharedInertiaData>().props;

  useEffect(() => {
    document.body.style.overflow = showMenu ? "hidden" : "auto";
  }, [showMenu]);

  const headerRef = useRef<HTMLElement>();

  const { isSticky } = useSticky(headerRef);

  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <header
        ref={headerRef}
        className={classNames("ps-header  header--mobile", {
          "header--sticky": isSticky,
        })}
      >
        <div className="container">
          <div className="ps-logo">
            <Link href="/">
              <img src={SVGLogo} alt="" style={{ width: 60 }} />
            </Link>
          </div>
          <ul className="mobile-header__actions">
            <li>
              <Link className="cart-mobile-icon" href="/cart">
                <CartIcon className="mobile-header-icon" />

                {cart.items.length > 0 ? (
                  <span className="cart-badge">{cart.items.length}</span>
                ) : null}
              </Link>
            </li>

            <li>
              <button
                className="hamburger-button"
                onClick={(e) => {
                  setShowMenu((isShown) => !isShown);
                }}
              >
                <div
                  className={classNames("hamburger-icon", {
                    "hamburger-icon--active": showMenu,
                  })}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </header>

      <div
        className={classNames("ps-menu--slidebar", {
          active: showMenu,
        })}
      >
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
                <Link onClick={closeMenu} href={`/shop/${category.slug}`}>
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
              <a href="tel:+13072008927" style={{ color: "#103178" }}>
                <strong>+1 (307) 200-8927</strong>
              </a>
              <br />
              <a href="mailto:info@sign7.com" style={{ color: "#103178" }}>
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
