import { AboutSection, SEOHead } from "@/src/components";
import { Link } from "@inertiajs/react";
import React from "react";
import { HomePageSection } from "@/src/components";

import slide4Bg from "@/assets/images/slides/slide4-bg.webp";
import slide4 from "@/assets/images/slides/slide4.webp";
import SVGLogo from "@/assets/images/logo.svg?react";
import SVGStar from "@/assets/icons/LARGE/star-check-large.svg?react";
import SVGCheck from "@/assets/icons/LARGE/check-large.svg?react";
import SVGLamp from "@/assets/icons/LARGE/lamp-large.svg?react";
import slide5 from "@/assets/images/slides/slide5.webp";
import footerBg from "@/assets/images/footer-bg.webp";

import truckIcon from "@/assets/icons/slider/truck.svg";
import rewardIcon from "@/assets/icons/slider/reward.svg";

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
        </div>

        <AboutSection />

        <HomePageSection altColor style={{ paddingBottom: "0 !important" }}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <HomePageSection.Title
                  title="Where We’re Located"
                  description="Our location is clearly marked on the map, so you always know where to find us."
                />
              </div>
            </div>
          </div>
        </HomePageSection>

        <section style={{ display: "flex" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2925.113947244095!2d-106.33172302406045!3d42.84932710405105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8760bca480ca44a5%3A0xf5d42b5e551b1978!2s312%20W%202nd%20St%2C%20Casper%2C%20WY%2082601%2C%20USA!5e0!3m2!1sen!2snl!4v1774984137480!5m2!1sen!2snl"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </div>
    </>
  );
};

export default About;
