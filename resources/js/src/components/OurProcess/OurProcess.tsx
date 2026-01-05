import SVGStar from "@/assets/icons/LARGE/star-check-large.svg?react";
import styles from "./OurProcess.module.scss";
import { HomePageSection } from "../HomePageSection";

const processSteps = [
  {
    icon: "message",
    title: "Initial Consultation",
    desc: "We begin with a one-on-one discussion to thoroughly understand your specific needs and the challenges you are facing.",
    colors: ["#80d0ff", "#ccecff"],
  },
  {
    icon: "calendar",
    title: "Analysis & Requirements Definition",
    desc: "Based on our discussion, we analyze your goals, define technical and organizational requirements, and identify potential risks or constraints.",
    colors: ["#cd9fff", "#e9cfff"],
  },
  {
    icon: "printer",
    title: "Customized Proposal",
    desc: "You will receive a tailored report outlining the proposed budget, project timeline, and any open questions that need clarification before moving forward.",
    colors: ["#ffcc26", "#ffedb5"],
  },
  {
    icon: "tools",
    title: "Project Execution",
    desc: "Once everything is approved, we handle scheduling, logistics, and implementation to deliver the solution on time and according to plan.",
    colors: ["#bce051", "#def0b6"],
  },
];

export default function OurProcess() {
  return (
    <HomePageSection altColor>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <HomePageSection.Title
              title="From Idea to Finished Product"
              description="We’ve made custom printing simple and transparent. Just a few steps — and your design becomes a high-quality printed product, ready to ship."
            />
          </div>
        </div>
      </div>
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
