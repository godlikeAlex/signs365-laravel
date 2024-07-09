import { SEOHead } from "@/src/components";
import { Link } from "@inertiajs/react";
import React from "react";

interface Props {
  title: string;
}

const About: React.FC<Props> = ({ title }: Props) => {
  return (
    <>
      <SEOHead title={title} />

      <div className="ps-about">
        <div className="container">
          <ul className="ps-breadcrumb">
            <li className="ps-breadcrumb__item">
              <Link href="/">Home</Link>
            </li>
            <li className="ps-breadcrumb__item active" aria-current="page">
              About us
            </li>
          </ul>
          <section className="ps-banner--round">
            <div className="ps-banner">
              <div className="ps-banner__block">
                <div className="ps-banner__content">
                  <div className="ps-logo">
                    <Link href="/">
                      <img src="/img/logo.png" alt="" />
                    </Link>
                  </div>
                  <h2 className="ps-banner__title">
                    Your one and only <br />
                    online pharmacy!
                  </h2>
                  <div className="ps-banner__btn-group">
                    <div className="ps-banner__btn">
                      <img src="/img/icon/virus.svg" alt="" />
                      Up to 5 users simultaneously
                    </div>
                    <div className="ps-banner__btn">
                      <img src="/img/icon/ribbon.svg" alt="" />
                      Has HEALTH certificate
                    </div>
                  </div>
                  <a className="ps-banner__shop bg-yellow" href="#">
                    About
                  </a>
                </div>
                <div className="ps-banner__thumnail">
                  <img
                    className="ps-banner__round"
                    src="img/round5.png"
                    alt=""
                  />
                  <img
                    className="ps-banner__image"
                    src="img/girl-face-mask.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="ps-about--info">
            <h2 className="ps-about__title">
              Effective and reliable <br />
              protection for your teeth
            </h2>
            <p className="ps-about__subtitle">
              The brush handle fits perfectly in the hand, is slim and
              beautifully made.
            </p>
            <div className="ps-about__extent">
              <div className="row m-0">
                <div className="col-12 col-md-4 p-0">
                  <div className="ps-block--about">
                    <div className="ps-block__icon">
                      <img src="img/icon/award-icon-2.png" alt="" />
                    </div>
                    <h4 className="ps-block__title">
                      Health Certificate 2000 - <br />
                      professional care
                    </h4>
                    <div className="ps-block__subtitle">
                      The highest quality and protection for your teeth
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 p-0">
                  <div className="ps-block--about">
                    <div className="ps-block__icon">
                      <img src="img/icon/dentistry-icon-2.png" alt="" />
                    </div>
                    <h4 className="ps-block__title">
                      Sonic cleaning <br />
                      and whitening power
                    </h4>
                    <div className="ps-block__subtitle">
                      At the same time, it protects and whitens
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 p-0">
                  <div className="ps-block--about">
                    <div className="ps-block__icon">
                      <img src="img/icon/toothbrush-icon-2.png" alt="" />
                    </div>
                    <h4 className="ps-block__title">
                      3 types <br />
                      of cleaning tips
                    </h4>
                    <div className="ps-block__subtitle">
                      Round, rectangular and super-wide
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
