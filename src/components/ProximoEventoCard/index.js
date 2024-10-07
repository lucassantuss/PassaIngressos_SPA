import styles from './ProximoEventoCard.module.css';

function ProximoEventoCard({ imageUrl, title, year }) {
  return (
    <div className={styles.event}>
      <img src={imageUrl} alt={title} className={styles.eventImage} />
      <p className={styles.eventTitle}>{title}</p>
      <p className={styles.eventYear}>{year}</p>
    </div>
  );
}

export default ProximoEventoCard;