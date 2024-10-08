import styles from "./EventoDisponivelCard.module.css";

const EventoDisponivelCard = ({ evento }) => {
  const { title, ingressos, ano, image, reverse } = evento;

  return (
    <div
      className={`${styles.cardDisponivelContainer} ${
        reverse ? styles.reverse : ""
      }`}
    >
      <img
        src={image}
        alt={title}
        className={styles.eventImageCardDisponivel}
      />
      <div className={styles.eventInfoCardDisponivel}>
        <h2>{title}</h2>
        <p>{ingressos} Ingressos disponíveis</p>
        <p>{ano}</p>
        <button className={styles.viewButtonCardDisponivel}>Visualizar</button>
      </div>
    </div>
  );
};

export default EventoDisponivelCard;