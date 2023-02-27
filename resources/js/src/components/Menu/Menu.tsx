import React, { useState } from "react";
import { useAppSelector } from "@/src/hooks";
import { Link } from "react-router-dom";
import MiniAuthModal from "./MiniAuthModal";
import MiniCartModal from "./MiniCartModal";

interface Props {}

interface MenuState {
  showMiniCart: boolean;
  showMiniAuth: boolean;
}

const Menu: React.FC<Props> = ({}: Props) => {
  const { isAuthed, user } = useAppSelector((state) => state.auth);
  const { cart, loaded } = useAppSelector((state) => state.cart);

  const [state, setState] = useState<MenuState>({
    showMiniAuth: false,
    showMiniCart: false,
  });

  return (
    <header className="ps-header ps-header--3 ps-header--4">
      <div className="ps-header__middle">
        <div className="container">
          <a className="ps-menu--sticky" href="#">
            <i className="fa fa-bars"></i>
          </a>
          <div className="ps-header__right" style={{ width: "100%" }}>
            <div className="ps-logo">
              <a href="index.html">
                {" "}
                <img src="/img/logo.png" alt="" />
                <img
                  className="sticky-logo"
                  src="/img/sticky-logo.png"
                  alt=""
                />
              </a>
            </div>
            <div className="ps-header__search">
              <form
                action="https://nouthemes.net/html/mymedi/do_action"
                method="post"
              >
                <div className="ps-search-table">
                  <div className="input-group">
                    <input
                      className="form-control ps-input"
                      type="text"
                      placeholder="Search for products"
                    />
                    <div className="input-group-append">
                      <a href="#">
                        <i className="fa fa-search"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="ps-header__menu">
              <ul className="menu"></ul>
            </div>
            <ul className="ps-header__icons">
              <li>
                <a className="ps-header__item open-search" href="#">
                  <i className="icon-magnifier"></i>
                </a>
              </li>
              <li
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
                <a className="ps-header__item" href="#">
                  <i className="icon-user"></i>
                </a>
                {/*  */}
                <MiniAuthModal active={state.showMiniAuth} />
              </li>

              <li
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
                <a className="ps-header__item" href="#" id="cart-mini">
                  <i className="icon-cart-empty"></i>
                  {loaded && cart.items.length > 0 ? (
                    <span className="badge">{cart.items.length}</span>
                  ) : null}
                </a>
                {/*  */}
                <MiniCartModal active={state.showMiniCart} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );

  return (
    <>
      <Link to={"/"}>Home</Link>

      {isAuthed && user ? (
        <Link to={"/profile"} style={{ marginLeft: 20 }}>
          Profile
        </Link>
      ) : (
        <>
          <Link to={"/login"} style={{ marginLeft: 20 }}>
            Login
          </Link>
          <Link to={"/register"} style={{ marginLeft: 20 }}>
            Register
          </Link>
        </>
      )}
    </>
  );
};

export default Menu;
