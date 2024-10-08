import styles from "./EventoRelacionadoCard.module.css";

const EventoRelacionadoCard = ({ evento }) => {
  const { title, ingressos, ano, image, size } = evento;

  return (
    <div className={styles.cardRelacionadoContainer}>
      <img
        src={image}
        alt={title}
        className={`${styles.eventImageCardRelacionado} ${styles[size]}`}
      />
      <div className={styles.eventInfoCardRelacionado}>
        <h2>{title}</h2>
        <p>{ingressos} Ingressos disponíveis</p>
        <p>{ano}</p>
      </div>
    </div>
  );
};

export default EventoRelacionadoCard;