import { Footer, Header, Menu, MobileHeader } from "@/src/components";
import { Head, Link } from "@inertiajs/react";
import React from "react";

interface ErrorProps {
  status: number | string;
}

const Error: React.FC<ErrorProps> = ({ status }: ErrorProps) => {
  const title = {
    503: "Service Unavailable",
    500: "Server Error",
    404: "Page Not Found",
    403: "Forbidden",
  }[status];

  return (
    <>
      <Head>
        <title>Page not found.</title>
      </Head>
      <Header />
      <MobileHeader />

      <div className="ps-page--notfound pt-100 pb-100">
        <div className="container">
          <div className="ps-page__content">
            <div className="row">
              <div className="col-12 text-center">
                <h1 className="ps-page__name">{status}</h1>
                <h5>{title}</h5>
                <p>
                  Something went wrong. Check out the main page - everything is
                  fine there.
                </p>
                <div>
                  <Link className="ps-btn ps-btn--primary" href="/">
                    Back to homepage
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Error;
