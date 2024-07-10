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
                <div
                  className="ps-banner__content"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div>
                    <div className="ps-logo">
                      <Link href="/">
                        <img src="/img/logo.png" alt="" />
                      </Link>
                    </div>
                    <h2 className="ps-banner__title">
                      Your Outdoor Advertising Experts
                    </h2>
                    <div className="ps-banner__btn-group">
                      <div className="ps-banner__btn">
                        <i
                          className="fa-solid fa-truck"
                          style={{ marginRight: 5 }}
                        ></i>
                        Free shipping
                      </div>
                      <div className="ps-banner__btn">
                        <i
                          className="fa-solid fa-certificate"
                          style={{ marginRight: 5 }}
                        ></i>
                        Certified products
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ps-banner__thumnail">
                  <img
                    className="ps-banner__round"
                    src="img/round5.png"
                    alt=""
                  />
                  <img
                    className="ps-banner__image"
                    src="img/banner-about.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="ps-about--info">
            <h2 className="ps-about__title">
              Your Trusted Partner In Outdoor Printing
            </h2>
            <p className="ps-about__subtitle">
              At Signs7, we are dedicated to delivering superior outdoor
              advertising solutions that leave a lasting impression. Our
              commitment to quality, speed, and innovation sets us apart from
              the rest.
            </p>
            <div className="ps-about__extent">
              <div className="row m-0">
                <div className="col-12 col-md-4 p-0">
                  <div className="ps-block--about">
                    <div className="ps-block__icon">
                      <i className="fa-solid fa-star icon-why-we"></i>
                    </div>
                    <h4 className="ps-block__title">Quality Assurance</h4>
                    <div className="ps-block__subtitle">
                      Consistently high standards for clarity, durability, and
                      visual impact.
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 p-0">
                  <div className="ps-block--about">
                    <div className="ps-block__icon">
                      <i className="fa-solid fa-clock icon-why-we"></i>
                    </div>
                    <h4 className="ps-block__title">Quick Turnaround</h4>
                    <div className="ps-block__subtitle">
                      Efficient processes ensure timely project completion.
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 p-0">
                  <div className="ps-block--about">
                    <div className="ps-block__icon">
                      <i className="fa-solid fa-palette icon-why-we"></i>
                    </div>
                    <h4 className="ps-block__title">Creative Solutions</h4>
                    <div className="ps-block__subtitle">
                      Transforming ideas into captivating visual campaigns.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="ps-about__content">
          <section
            className="ps-about__banner"
            data-background="/img/Mask-Group.png"
            style={{ backgroundImage: 'url("/img/Mask-Group.png")' }}
          >
            <div className="container">
              <div className="ps-banner">
                <h2 className="ps-banner__title">EXCLUSIVE SAVINGS INSIDE</h2>
                <div className="ps-banner__desc">
                  Unlock exclusive savings with our promo code! Enjoy a 10%
                  discount on first order. Enter promo code [HELLO24] at
                  checkout and save big. Don't miss out!
                </div>
                <Link className="ps-banner__shop" href="/">
                  Shop now
                </Link>
              </div>
            </div>
          </section>
        </div>

        <section className="ps-about__project">
          <div className="container">
            <h2 className="ps-about__title">Leaders in outdoor advertising</h2>
            <section className="ps-section--block-grid">
              <div className="ps-section__thumbnail">
                {" "}
                <a className="ps-section__image" href="#">
                  <img src="img/about/about-us-1.jpg" alt="" />
                </a>
              </div>
              <div className="ps-section__content">
                <h3 className="ps-section__title">
                  Setting the Standard in Outdoor Advertising
                </h3>
                <div className="ps-section__subtitle">
                  With Over 1 years of Experience, We Deliver Unmatched
                  Expertise and Innovation
                </div>
                <div className="ps-section__desc">
                  With over 1 years of industry leadership, Signs7 is recognized
                  for creating impactful and memorable outdoor advertising
                  campaigns. Our portfolio includes a diverse range of projects
                  — from city-wide digital signage installations to high-traffic
                  highway billboards. We combine strategic placement with
                  creative design to ensure maximum visibility and effectiveness
                  for our clients. Our team of experts understands the nuances
                  of outdoor advertising, including optimal viewing angles,
                  lighting considerations, and audience engagement tactics.
                </div>
              </div>
            </section>
            <section className="ps-section--block-grid row-reverse">
              <div className="ps-section__thumbnail">
                {" "}
                <a className="ps-section__image" href="#">
                  <img src="img/about/about-us-2.jpg" alt="" />
                </a>
              </div>
              <div className="ps-section__content">
                <h3 className="ps-section__title">
                  Innovative Solutions for Outdoor Branding
                </h3>
                <div className="ps-section__subtitle">
                  Transforming Ideas into Captivating Outdoor Experiences
                </div>
                <div className="ps-section__desc">
                  At Signs7, we believe in pushing creative boundaries to
                  deliver outdoor advertising solutions that captivate and
                  engage. Our team of talented designers and strategists
                  collaborates closely with each client to craft bespoke
                  campaigns that resonate with target audiences. From dynamic
                  digital displays to iconic billboard designs, our portfolio
                  showcases a breadth of creative excellence. We pride ourselves
                  on our ability to blend visual aesthetics with strategic
                  messaging, ensuring that each campaign stands out in the
                  competitive outdoor advertising landscape. Discover how our
                  innovative approach can elevate your brand's presence.
                </div>
              </div>
            </section>
            <section className="ps-section--block-grid">
              <div className="ps-section__thumbnail">
                {" "}
                <a className="ps-section__image" href="#">
                  <img src="img/about/about-us-3.jpg" alt="" />
                </a>
              </div>
              <div className="ps-section__content">
                <h3 className="ps-section__title">
                  Dedicated to Client Success
                </h3>
                <div className="ps-section__subtitle">
                  Building Relationships through Personalized Service and Proven
                  Results
                </div>
                <div className="ps-section__desc">
                  At Signs7, client satisfaction is our top priority. We tailor
                  our approach to meet each client's unique needs, providing
                  personalized service from concept to completion. Our
                  commitment to transparency, reliability, and proactive
                  communication ensures a smooth and efficient project
                  experience. With a proven track record of delivering results
                  that exceed expectations, many of our clients return to us for
                  their subsequent advertising needs and recommend us to others.
                  Partner with Signs7 and experience the difference in outdoor
                  advertising excellence.
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
