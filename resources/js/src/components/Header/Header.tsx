import { useRef } from "react";
import { Link, usePage } from "@inertiajs/react";

import { SharedInertiaData } from "@/src/types/inertiaTypes";
import classNames from "classnames";
import { useSticky } from "@/src/hooks/useSticky";

import PhoneIcon from "@/assets/icons/SMALL/phone.svg?react";
import EmailIcon from "@/assets/icons/SMALL/email.svg?react";
import LocationIcon from "@/assets/icons/SMALL/location.svg?react";
import CartIcon from "@/assets/icons/SMALL/cart.svg?react";
import UserIcon from "@/assets/icons/SMALL/user.svg?react";
import SVGLogo from "@/assets/images/logo.svg";

import HeaderCategoryItem from "./HeaderCategoryItem";
import SearchForm from "../SearchForm";

import classes from "./Header.module.scss";
import "./body.scss";

export default function Header() {
  const pageData = usePage<SharedInertiaData>();
  const { cart, auth, currentCity, homeCategories } = pageData.props;

  const headerRef = useRef<HTMLElement>();
  const { isSticky } = useSticky(headerRef);

  return (
    <header
      ref={headerRef}
      className={classNames(classes.header, {
        [classes.headerSticky]: isSticky,
      })}
    >
      <div className={classes.topHeader}>
        <div className={classNames("container", classes.topHeaderContainer)}>
          <div className={classNames(classes.logoContainer)}>
            <Link href="/">
              <img src={SVGLogo} className={classes.navLogo} alt="Signs" />
            </Link>

            <div className={classNames(classes.logoQuote)}>
              Print. <br /> Install. <br /> Grow.
            </div>
          </div>

          <ul className={classes.topHeaderLinks}>
            <li className="top-header__nav-link">
              <Link href="/" className={classes.topHeaderLink}>
                Home
              </Link>
            </li>

            <li className="top-header__nav-link">
              <Link href="/about" className={classes.topHeaderLink}>
                About
              </Link>
            </li>

            <li className="top-header__nav-link">
              <Link href="/contacts" className={classes.topHeaderLink}>
                Contact
              </Link>
            </li>
          </ul>

          <div className={classes.topHeaderSearchContainer}>
            <SearchForm />
          </div>

          <div className={classes.topHeaderRight}>
            <a href="tel:+13072008927" className={classes.topHeaderPhone}>
              <PhoneIcon className={classes.phoneIcon} />
              <span style={{ marginLeft: 5 }}>+1 (307) 200-8927</span>
            </a>

            <div>
              <span className={classes.location}>
                <LocationIcon className={classes.topHeaderIcon} />

                <span style={{ marginLeft: 5 }}>Nationwide</span>
              </span>

              <a href="mailto:info@signs7.com" className={classes.mail}>
                <EmailIcon className={classes.topHeaderIcon} />

                <span style={{ marginLeft: 5 }}>info@signs7.com</span>
              </a>
            </div>
          </div>

          {/* <ul className={classes.topHeaderLeft}>
            <li>
              <a
                className={classNames(
                  classes.topHeaderLink,
                  classes.topHeaderLinkWithIcon
                )}
                href="tel:+13072008927"
              >
                <PhoneIcon className={classes.topHeaderIcon} />
                <span style={{ marginLeft: 5 }}>tel: +1 (307) 200-8927</span>
              </a>
            </li>

            <li>
              <a
                className={classNames(
                  classes.topHeaderLink,
                  classes.topHeaderLinkWithIcon
                )}
                href="mailto:info@signs7.com"
              >
                <EmailIcon className={classes.topHeaderIcon} />

                <span style={{ marginLeft: 5 }}>info@signs7.com</span>
              </a>
            </li>

            <li>
              <span
                className={classNames(
                  classes.topHeaderLink,
                  classes.topHeaderLinkWithIcon
                )}
              >
                <LocationIcon className={classes.topHeaderIcon} />

                <span style={{ marginLeft: 5 }}>{currentCity}</span>
              </span>
            </li>
          </ul> */}

          {/* <div className={classes.topHeaderSearchContainer}>
            <SearchForm />
          </div> */}
        </div>
      </div>

      <nav className={classes.nav}>
        <div className={classNames("container", classes.navContainer)}>
          <ul className={classes.navItems}>
            {homeCategories.map((category) => (
              <HeaderCategoryItem key={category.id} {...category} />
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
