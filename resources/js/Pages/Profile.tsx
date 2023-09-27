import { OrdersHistory } from "@/src/components";
import OrdersList from "@/src/components/OrdersHistory/OrdersList";
import { IOrdersPagenation } from "@/src/types/axiosResponses";
import { SharedInertiaData } from "@/src/types/inertiaTypes";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";

interface Props extends SharedInertiaData {
  orders: IOrdersPagenation;
}

const Profile: React.FC<Props> = ({ auth, orders }: Props) => {
  return (
    <>
      <Head>
        <title>My profile</title>
      </Head>
      <div className="ps-shopping">
        <div className="container">
          <ul className="ps-breadcrumb">
            <li className="ps-breadcrumb__item">
              <Link href="/">Home</Link>
            </li>
            <li className="ps-breadcrumb__item active" aria-current="page">
              Profile
            </li>
          </ul>
          <h3 className="ps-shopping__title">Profile</h3>

          <div className="ps-shopping__content">
            <div className="row">
              <div className="col-12 col-md-7 col-lg-9">
                <OrdersList
                  data={orders.data}
                  pageCount={orders.meta.last_page}
                  currentPage={orders.meta.current_page}
                />
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
                        src={
                          auth?.user?.avatar
                            ? auth.user.avatar
                            : "/default-profile.png"
                        }
                        width={80}
                        style={{ borderRadius: "50%" }}
                        height={80}
                      />

                      <span style={{ marginTop: 20, fontWeight: "bold" }}>
                        {auth.user.name}
                      </span>
                      <span style={{ marginTop: 5 }}>{auth.user.email}</span>
                    </div>
                  </div>

                  <div className="ps-shopping__checkout">
                    <Link
                      className="ps-shopping__link"
                      href="/profile/edit"
                      style={{ marginBottom: 15 }}
                    >
                      Edit Profile
                    </Link>

                    <a
                      className="ps-btn ps-btn--warning"
                      onClick={() => router.post("logout")}
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
    </>
  );
};

export default Profile;
