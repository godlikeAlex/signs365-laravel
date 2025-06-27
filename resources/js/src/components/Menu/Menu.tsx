import React, { useEffect, useRef, useState } from "react";
import MiniAuthModal from "./MiniAuthModal";
import MiniCartModal from "./MiniCartModal";
import { usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

import { SharedInertiaData } from "@/src/types/inertiaTypes";
import classNames from "classnames";

import PhoneIcon from "@/assets/icons/SMALL/phone.svg?react";
import EmailIcon from "@/assets/icons/SMALL/email.svg?react";
import LocationIcon from "@/assets/icons/SMALL/location.svg?react";
import CartIcon from "@/assets/icons/SMALL/cart.svg?react";
import UserIcon from "@/assets/icons/SMALL/user.svg?react";

import SVGLogo from "@/assets/images/logo.svg";
import { useSticky } from "@/src/hooks/useSticky";

interface Props {}

interface MenuState {
  showMiniCart: boolean;
  showMiniAuth: boolean;
}

const Menu: React.FC<Props> = ({}: Props) => {
  const pageData = usePage<SharedInertiaData>();
  const { homeCategories, cart, auth, currentCity } = pageData.props;

  const [state, setState] = useState<MenuState>({
    showMiniAuth: false,
    showMiniCart: false,
  });

  const headerRef = useRef<HTMLElement>();

  const { isSticky } = useSticky(headerRef);

  return (
    <>
      <header
        ref={headerRef}
        className={classNames("header", { "header--sticky": isSticky })}
      >
        <div className="top-header">
          <div className="container">
            <ul className="top-header-left">
              <li>
                <a
                  className="top-header__link top-header__link--icon"
                  href="tel:+13072008927"
                >
                  <PhoneIcon className="top-header-icon" />
                  <span style={{ marginLeft: 5 }}>+1 (307) 200-8927</span>
                </a>
              </li>

              <li>
                <a
                  className="top-header__link top-header__link--icon"
                  href="mailto:info@signs7.com"
                >
                  <EmailIcon className="top-header-icon" />

                  <span style={{ marginLeft: 5 }}>info@signs7.com</span>
                </a>
              </li>

              <li>
                <span className="top-header__link--icon">
                  <LocationIcon className="top-header-icon" />

                  <span style={{ marginLeft: 5 }}>{currentCity}</span>
                </span>
              </li>
            </ul>

            <div className="top-header-right">
              <ul className="top-header-right__links">
                <li className="top-header__nav-link">
                  <Link href="/" className="top-header__link">
                    Home
                  </Link>
                </li>

                <li className="top-header__nav-link">
                  <Link href="/about" className="top-header__link">
                    About
                  </Link>
                </li>

                <li className="top-header__nav-link">
                  <Link href="/contacts" className="top-header__link">
                    Contact
                  </Link>
                </li>
              </ul>
              <ul className="top-header-right__actions">
                <li>
                  <Link
                    className="top-header__link"
                    href={auth.user ? "/profile" : "/login"}
                  >
                    <UserIcon className="top-header-icon" />
                  </Link>
                </li>
                <li
                  style={{ position: "relative" }}
                  onMouseLeave={() =>
                    setState((oldState) => ({
                      ...oldState,
                      showMiniCart: false,
                    }))
                  }
                  onMouseEnter={() =>
                    setState((oldState) => ({
                      ...oldState,
                      showMiniCart: true,
                    }))
                  }
                >
                  <Link
                    className="top-header__cart-link"
                    href="/cart"
                    id="cart-mini"
                  >
                    <CartIcon className="top-header-icon" />
                    {cart.items.length > 0 ? (
                      <span className="badge-mini">{cart.items.length}</span>
                    ) : null}
                  </Link>
                  <MiniCartModal active={state.showMiniCart} />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <nav className="category-nav">
          <div className="container">
            <ul className="category-menu">
              <li className="category-menu-logo">
                <Link href="/">
                  <img src={SVGLogo} alt="Signs" />
                </Link>
              </li>
              {homeCategories.map(
                ({ id, title, icon, slug, products, colors }, index) => (
                  <li
                    className={classNames("category-menu-item has-dropdown", {
                      active: pageData.url.startsWith(`/shop/${slug}`),
                    })}
                    style={{
                      ["--primaryCategoryColor" as string]: colors.primary,
                      ["--alternativeCategoryColor" as string]:
                        colors.alternative,
                    }}
                    key={id}
                  >
                    <Link
                      href={`/shop/${slug}`}
                      className={classNames("category-menu-item__link")}
                    >
                      <img
                        src={`/storage/${icon}`}
                        alt={title}
                        style={{ width: "34px", height: "34px" }}
                      />

                      <div className="category-menu-item__name">{title}</div>
                    </Link>

                    <div className="dropdown-content-menu">
                      {products.map((product) => (
                        <Link
                          href={`/shop/${product.categories[0].slug}/${product.slug}`}
                          key={`${id}-${product.id}`}
                        >
                          {product.title}
                        </Link>
                      ))}
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Menu;
