import styles from "./InfoCard.module.css";

export default function InfoCard({ icon, title, text }) {
  return (
    <div className={styles.infoCard}>
      {icon && (
        <div className={styles.iconInfoCard}>
          <img src={`/images/icons/${icon}.svg`} alt={title} title={title} />
        </div>
      )}
      
      {title && <h3 className={styles.titleInfoCard}>{title}</h3>}

      {text && text.length > 0 && (
        <div>
          {text.map((line, index) => (
            <p className={styles.textInfoCard} key={index}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}
