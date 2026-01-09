import { Link } from "@inertiajs/react";
import Button from "../Button";
import { HomePageSection } from "../HomePageSection";

export default function AboutSection() {
  return (
    <HomePageSection id="about">
      <div className="container">
        <div className="row flex-wrap align-items-center">
          <div className="col-xs-12 col-md-6">
            <img src="/img/team.webp" className="cover-image" />
          </div>
          <div className="col-xs-12 col-md-6">
            <span className="highlight" style={{ color: "#FFCA19" }}>
              About Us
            </span>
            <h2 className="section_header">
              Expert Commercial Sign Installers
            </h2>
            <p>
              With the right crew, managing large projects becomes simple. We
              recognized that big projects often slow our customers down,
              causing stress and leading to the loss of other business
              opportunities while they try to manage dozens of communication
              threads.
            </p>
            <p>
              When the Signs7 team steps in, every project receives a detailed
              logistics sheet, regular status updates, and we handle and manage
              all communication and budget control with vendors. All that's left
              is for our customers to focus on selling their services—we take
              care of the rest.
            </p>

            <Button className="w-100" component={Link} href="/contacts">
              Contact us
            </Button>

            <div className="toppadding_10 visible-md visible-lg"></div>
          </div>
        </div>
      </div>
    </HomePageSection>
  );
}
