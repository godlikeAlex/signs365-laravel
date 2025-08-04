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

import classes from "./Header.module.scss";

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
          <ul className={classes.topHeaderLeft}>
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
          </ul>

          <ul className={classes.topHeaderRight}>
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
            <li>
              <Link
                className={classes.topHeaderLink}
                href={auth.user ? "/profile" : "/login"}
              >
                <UserIcon
                  className={classNames(
                    classes.topHeaderIcon,
                    classes.topHeaderIconAction
                  )}
                />
              </Link>
            </li>
            <li style={{ position: "relative" }}>
              <Link
                className={classes.topHeaderLink}
                href="/cart"
                id="cart-mini"
              >
                <CartIcon
                  className={classNames(
                    classes.topHeaderIcon,
                    classes.topHeaderIconAction
                  )}
                />
                {cart.items.length > 0 ? (
                  <span className="badge-mini">{cart.items.length}</span>
                ) : null}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <nav className={classes.nav}>
        <div className={classNames("container", classes.navContainer)}>
          <Link href="/">
            <img src={SVGLogo} className={classes.navLogo} alt="Signs" />
          </Link>

          <ul className={classes.navItems}>
            {homeCategories.map(({ id, title, icon, slug, colors }, index) => (
              <li
                className={classNames(classes.navCategoryItem, {
                  [classes.navCategoryItemActive]: pageData.url.startsWith(
                    `/shop/${slug}`
                  ),
                })}
                style={{
                  ["--primaryCategoryColor" as string]: colors.primary,
                  ["--alternativeCategoryColor" as string]: colors.alternative,
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
                    style={{ width: "25px", height: "25px" }}
                  />

                  <div className={classes.navCategoryItemTitle}>{title}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
