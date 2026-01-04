import SVGStar from "@/assets/icons/LARGE/star-check-large.svg?react";
import styles from "./OurProcess.module.scss";

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
    <section style={{ paddingBlock: 120 }}>
      <div className="container">
        <div className="row">
          {processSteps.map((step, index) => (
            <div className="col-md-3">
              <div
                className={styles.step}
                style={{
                  ["--primary-color" as string]: step.colors[0],
                  ["--alt-color" as string]: step.colors[1],
                }}
              >
                <SVGStar className={styles.stepIcon} />

                <h4>{step.title}</h4>
                <p>{step.desc}</p>

                <span className={styles.stepNum}>{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
