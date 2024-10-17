import styles from "./EventoDisponivelCard.module.css";

const EventoDisponivelCard = ({ evento }) => {
  const { nomeEvento, quantidadeIngressosDisponiveis, ano, imagemEvento, reverse } = evento;
  
  return (
    <div
      className={`${styles.cardDisponivelContainer} ${
        reverse ? styles.reverse : ""
      }`}
    >
      <img
        src={imagemEvento}
        alt={nomeEvento}
        title={nomeEvento}
        className={styles.eventImageCardDisponivel}
      />
      <div className={styles.eventInfoCardDisponivel}>
        <h2>{nomeEvento}</h2>
        <p>{quantidadeIngressosDisponiveis} Ingressos disponíveis</p>
        <p>{ano}</p>
        <button className={styles.viewButtonCardDisponivel}>Visualizar</button>
      </div>
    </div>
  );
};

export default EventoDisponivelCard;