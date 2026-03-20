import styles from "./EstimateFieldDisclaimer.module.scss";

interface Props {
  text: string;
}

export default function EstimateFieldDisclaimer({ text }: Props) {
  return <p className={styles.disclaimer}>{text}</p>;
}
