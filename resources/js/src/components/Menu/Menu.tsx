import React, { useState } from "react";
import MiniAuthModal from "./MiniAuthModal";
import MiniCartModal from "./MiniCartModal";
import { usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

import "./style.css";
import { SharedInertiaData } from "@/src/types/inertiaTypes";
import classNames from "classnames";

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

  console.log(pageData.url.startsWith(`/shop/adhesive-prints`), "props");

  return (
    <>
      <header
        className="ps-header ps-header--2 ps-header--7 ps-header--4"
        style={{ borderBottom: "1px solid #d9dee8" }}
      >
        <div className="ps-header__top">
          <div className="container">
            <div className="header-left d-flex">
              <a
                href="tel:+13072008927"
                className="ps-header__text d-flex align-items-center"
              >
                <i className="icon-telephone" />
                <strong style={{ marginLeft: 5 }}>+1 (307) 200-8927</strong>
              </a>

              <a
                href="mailto:info@signs7.com"
                className="ps-header__text d-flex align-items-center"
              >
                <i className="icon-envelope" />

                <strong style={{ marginLeft: 5 }}>info@signs7.com</strong>
              </a>

              <span className="ps-header__text d-flex align-items-center">
                <i className="icon-map-marker" />

                <strong style={{ marginLeft: 5 }}>{currentCity}</strong>
              </span>
            </div>

            <div className="ps-top__right">
              <div className="ps-language-currency">
                <div
                  className="ps-dropdown-value with-dp-modal"
                  onMouseLeave={() =>
                    setState((oldState) => ({
                      ...oldState,
                      showMiniAuth: false,
                    }))
                  }
                  onMouseEnter={() =>
                    setState((oldState) => ({
                      ...oldState,
                      showMiniAuth: true,
                    }))
                  }
                >
                  <Link
                    className="ps-header__item"
                    href={auth.user ? "/profile" : "/login"}
                  >
                    <i className="icon-user"></i>
                  </Link>
                </div>

                <div
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
                  className="ps-dropdown-value with-dp-modal"
                >
                  <Link className="ps-header__item" href="/cart" id="cart-mini">
                    <i className="icon-cart-empty"></i>
                    {cart.items.length > 0 ? (
                      <span className="badge-mini">{cart.items.length}</span>
                    ) : null}
                  </Link>
                  {/*  */}
                  <MiniCartModal active={state.showMiniCart} />
                </div>
              </div>

              <ul className="menu-top">
                <li className="nav-item">
                  <Link className="nav-link" href="/">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" href="/about">
                    About
                  </Link>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="ps-header__middle">
          <div className="container">
            {/* <a className="ps-menu--sticky" href="#">
              <i className="fa fa-bars"></i>
            </a> */}
            <div className="ps-header__menu" style={{ width: "100%" }}>
              <ul className="menu-custom">
                <li className="ps-logo custom-logo">
                  <Link href="/">
                    <img src="/img/logo.png" alt="" />
                    <img className="sticky-logo" src="/img/logo.png" alt="" />
                  </Link>
                </li>
                {homeCategories.map(
                  ({ id, title, icon, slug, products }, index) => (
                    <li
                      className={classNames(
                        "ps-category__item ps-category__item-custom has-dropdown",
                        { active: pageData.url.startsWith(`/shop/${slug}`) }
                      )}
                      key={id}
                    >
                      <Link
                        href={`/shop/${slug}`}
                        className={classNames("ps-category__link")}
                      >
                        <img
                          src={`/storage/${icon}`}
                          alt={title}
                          style={{ width: "34px", height: "34px" }}
                        />
                      </Link>
                      <div className="ps-category__name">
                        <Link href={`/shop/${slug}`}>{title}</Link>
                      </div>

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
          </div>
        </div>
      </header>
    </>
  );
};

export default Menu;
