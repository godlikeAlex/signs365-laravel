import styles from "./EstimateFieldError.module.scss";

interface Props {
  error: string;
}

export default function EstimateFieldError({ error }: Props) {
  return <p className={styles.error}>{error}</p>;
}
