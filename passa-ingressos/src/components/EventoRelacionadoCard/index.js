import styles from './EventoRelacionadoCard.module.css';

const EventoRelacionadoCard = ({ evento }) => {
  const { title, ingressos, ano, image, size } = evento;

  return (
    <div className={styles.cardContainer}>
      <img src={image} alt={title} className={`${styles.eventImage} ${styles[size]}`} />
      <div className={styles.eventInfo}>
        <h2>{title}</h2>
        <p>{ingressos} Ingressos disponíveis</p>
        <p>{ano}</p>
      </div>
    </div>
  );
};

export default EventoRelacionadoCard;