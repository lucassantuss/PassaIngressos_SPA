import styles from './EventoCard.module.css';

const EventoCard = ({ evento }) => {
  const { title, ingressos, ano, image, reverse } = evento;

  return (
    <div className={`${styles.cardContainer} ${reverse ? styles.reverse : ''}`}>
      <img src={image} alt={title} className={styles.eventImage} />
      <div className={styles.eventInfo}>
        <h2>{title}</h2>
        <p>{ingressos} Ingressos disponíveis</p>
        <p>{ano}</p>
        <button className={styles.viewButton}>Visualizar</button>
      </div>
    </div>
  );
};

export default EventoCard;