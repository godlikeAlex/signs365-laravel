import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

interface NotFoundProps {}

const NotFound: React.FC<NotFoundProps> = ({}: NotFoundProps) => {
  return (
    <>
      <Helmet>
        <title>Page not found.</title>
      </Helmet>

      <div className="ps-page--notfound pt-100 pb-100">
        <div className="container">
          <div className="ps-page__content">
            <div className="row">
              <div className="col-12 text-center">
                <h1 className="ps-page__name">404</h1>
                <h5>Whoopsy, this page not found...</h5>
                <p>Please back to homepage or check our offer</p>
                <div>
                  <Link className="ps-btn ps-btn--primary" to="/">
                    Back to homepage
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
