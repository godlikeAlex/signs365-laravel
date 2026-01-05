import SVGStar from "@/assets/icons/LARGE/star-check-large.svg?react";
import styles from "./OurProcess.module.scss";
import { HomePageSection } from "../HomePageSection";

const processSteps = [
  {
    icon: "message",
    title: "You contact us",
    desc: "Send us your request and tell us about your sign, location, and goals",
    colors: ["#80d0ff", "#ccecff"],
  },
  {
    icon: "calendar",
    title: "We plan the details",
    desc: "We discuss requirements, timing, and budget to align on every detail",
    colors: ["#cd9fff", "#e9cfff"],
  },
  {
    icon: "printer",
    title: "We create the print",
    desc: "We prepare the design and produce a high-quality print",
    colors: ["#ffcc26", "#ffedb5"],
  },
  {
    icon: "tools",
    title: "We install your sign",
    desc: "Professional installation done safely, on time, and as planned",
    colors: ["#bce051", "#def0b6"],
  },
];

export default function OurProcess() {
  return (
    <HomePageSection altColor style={{ paddingBottom: 0 }}>
      <HomePageSection.Title
        title="From Idea to Finished Product"
        description="We’ve made custom printing simple and transparent. Just a few steps — and your design becomes a high-quality printed product, ready to ship."
      />
      <div className="container-fluid">
        <div className="row">
          {processSteps.map((step, index) => (
            <div className="col-md-3 p-0">
              <div
                className={styles.step}
                style={{
                  ["--primary-color" as string]: step.colors[0],
                  ["--alt-color" as string]: step.colors[1],
                }}
              >
                {/* <SVGStar className={styles.stepIcon} /> */}
                <span className={styles.stepNum}>0{index + 1}</span>

                <h4 className={styles.title}>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HomePageSection>
  );
}
