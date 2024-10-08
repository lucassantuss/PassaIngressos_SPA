import styles from "./InfoCard.module.css";

export default function InfoCard({ icon, title, text }) {
  return (
    <div className={styles.infoCard}>
      <div className={styles.iconInfoCard}>
        <img src={`/images/icons/${icon}.svg`} alt={title} />
      </div>
      <div>
        <h3 className={styles.titleInfoCard}>{title}</h3>
        <p className={styles.textInfoCard}>{text}</p>
      </div>
    </div>
  );
}