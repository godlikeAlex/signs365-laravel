import { OrdersHistory } from "@/src/components";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import { logoutUser } from "@/src/redux/authSlice";
import React from "react";
import { Link } from "react-router-dom";

interface Props {}

const Profile: React.FC<Props> = ({}: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="ps-shopping">
      <div className="container">
        <ul className="ps-breadcrumb">
          <li className="ps-breadcrumb__item">
            <Link to="/">Home</Link>
          </li>
          <li className="ps-breadcrumb__item active" aria-current="page">
            Profile
          </li>
        </ul>
        <h3 className="ps-shopping__title">Profile</h3>

        <div className="ps-shopping__content">
          <div className="row">
            <div className="col-12 col-md-7 col-lg-9">
              <OrdersHistory />
            </div>

            <div className="col-12 col-md-5 col-lg-3">
              <div className="ps-shopping__box">
                <div
                  className="ps-shopping__row"
                  style={{ textAlign: "center" }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={"/default-profile.png"}
                      width={80}
                      style={{ borderRadius: "50%" }}
                      height={80}
                    />

                    <span style={{ marginTop: 20 }}>{user.name}</span>
                  </div>
                </div>

                <div className="ps-shopping__row">
                  <div className="ps-shopping__label">Email</div>
                  <div className="ps-shopping__price">{user?.email}</div>
                </div>
                <div className="ps-shopping__checkout">
                  <Link
                    className="ps-shopping__link"
                    to="/profile/edit"
                    style={{ marginBottom: 15 }}
                  >
                    Edit Profile
                  </Link>

                  <a
                    className="ps-btn ps-btn--warning"
                    href=""
                    onClick={() => dispatch(logoutUser())}
                    style={{ marginBottom: 0, marginTop: 15 }}
                  >
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
