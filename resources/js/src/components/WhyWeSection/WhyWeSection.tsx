// import firstIcon from "./assets/first_icon.svg";
// import secondIcon from "./assets/second_icon.svg";
// import thirdIcon from "./assets/third_icon.svg";

import LocationIcon from "./icons/location.svg?react";
import ExportIcon from "./icons/expert.svg?react";
import ClockIcon from "./icons/time.svg?react";
import ExecutionIcon from "./icons/execution.svg?react";
import PhoneIcon from "./icons/phone.svg?react";
import TrustIcon from "./icons/trust.svg?react";

import { HomePageSection } from "../HomePageSection";
import styles from "./WhyWeSection.module.css";

const WHY_WE_CONTENT = [
  {
    title: "End-to-end installation management",
    description:
      "We handle the entire installation process — from the initial request to final mounting. You get a single team responsible for planning, coordination, and execution.",
    Icon: LocationIcon,
    color: "#ffcc26",
  },
  {
    title: "Experienced installation team",
    description:
      "Our installers have hands-on experience with banners, signs, and large-format advertising. We work accurately, safely, and efficiently in real on-site conditions.",
    Icon: ExportIcon,
    color: "#cd9fff",
  },
  {
    title: "On-time and reliable execution",
    description:
      "We understand the importance of deadlines in advertising. Every project is carefully scheduled and completed on time, without unnecessary delays.",
    Icon: ClockIcon,
    color: "#80d0ff",
  },
  {
    title: "Attention to quality and safety",
    description:
      "Each installation is done with attention to detail and strict safety standards. We ensure secure mounting and a clean, professional result.",
    Icon: ExecutionIcon,
    color: "#ffa4c2",
  },
  {
    title: "Always in touch",
    description:
      "We stay in touch throughout the entire installation process, quickly responding to questions, changes, and coordination needs.",
    Icon: PhoneIcon,
    color: "#bce051",
  },
  {
    title: "Trusted installation partner",
    description:
      "We work as a reliable partner for agencies and businesses, taking full responsibility for the installation and delivering consistent, high-quality results.",
    Icon: TrustIcon,
    color: "#ffab81",
  },
];

export default function WhyWeSection() {
  return (
    <HomePageSection>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <HomePageSection.Title
              title="Why work with us"
              description="We take care of the entire banner and advertising installation process — from the first request to the final result. Our team focuses on clear communication, reliable execution, and professional installation, so you can be confident your project is in good hands."
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div
          className="row justify-content-center row-gap-3"
          style={{ marginTop: 60, rowGap: 80 }}
        >
          {WHY_WE_CONTENT.map(({ title, description, Icon, color }, index) => (
            <div className="col-md-4" key={index}>
              <div className={styles["whyWeBlock"]}>
                <div className={styles.content}>
                  <div
                    className={styles["iconContainer"]}
                    style={{ background: color }}
                  >
                    <Icon className={styles.icon} />
                  </div>

                  <h4 className={styles.title}>{title}</h4>
                  <p className={styles.description}>{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HomePageSection>
  );
}
