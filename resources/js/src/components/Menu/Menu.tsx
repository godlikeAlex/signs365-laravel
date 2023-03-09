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
  const { homeCategories } = useAppSelector((state) => state.app);

  const [state, setState] = useState<MenuState>({
    showMiniAuth: false,
    showMiniCart: false,
  });

  return (
    <>
      <header
        className="ps-header ps-header--2 ps-header--7 ps-header--4"
        style={{ borderBottom: "1px solid #d9dee8" }}
      >
        <div className="ps-header__top">
          <div className="container">
            <a href="tel:(949)9421363" className="ps-header__text">
              <strong>+ (949) 942-1363 - Call Us</strong>
            </a>
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
                    to={user ? "/profile" : "/login"}
                  >
                    <i className="icon-user"></i>
                  </Link>
                  {/*  */}
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
                  <Link className="ps-header__item" to="/cart" id="cart-mini">
                    <i className="icon-cart-empty"></i>
                    {loaded && cart.items.length > 0 ? (
                      <span className="badge-mini">{cart.items.length}</span>
                    ) : null}
                  </Link>
                  {/*  */}
                  <MiniCartModal active={state.showMiniCart} />
                </div>
              </div>

              <ul className="menu-top">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    About
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contact
                  </a>
                </li>
              </ul>
              <div className="ps-header__text">
                Need help? <strong>0020 500 - MYMEDI - 000</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="ps-header__middle">
          <div className="container">
            <a className="ps-menu--sticky" href="#">
              <i className="fa fa-bars"></i>
            </a>
            <div className="ps-header__menu" style={{ width: "100%" }}>
              <ul className="menu-custom">
                <li className="ps-logo custom-logo">
                  <Link to="/">
                    <img src="/img/logo.png" alt="" />
                    <img className="sticky-logo" src="/img/logo.png" alt="" />
                  </Link>
                </li>
                {homeCategories.map(({ id, title, icon, slug }, index) => (
                  <li
                    className="ps-category__item ps-category__item-custom"
                    key={id}
                  >
                    <Link to={`/catalog/${slug}`} className="ps-category__link">
                      <img
                        src={`/storage/${icon}`}
                        alt={title}
                        style={{ width: "34px", height: "34px" }}
                      />
                    </Link>
                    <div className="ps-category__name">
                      <Link to={`/catalog/${slug}`}>{title}</Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
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
