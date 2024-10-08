import styles from "./ProximoEventoCard.module.css";

function ProximoEventoCard({ imageUrl, title, year }) {
  return (
    <div className={styles.proximoEventoCard}>
      <img
        src={imageUrl}
        alt={title}
        className={styles.eventImageCardProximoEvento}
      />
      <p className={styles.eventTitleCardProximoEvento}>{title}</p>
      <p className={styles.eventYearCardProximoEvento}>{year}</p>
    </div>
  );
}

export default ProximoEventoCard;