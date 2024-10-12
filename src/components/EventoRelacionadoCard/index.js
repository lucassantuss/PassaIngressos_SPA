import styles from "./EventoRelacionadoCard.module.css";

const EventoRelacionadoCard = ({ evento }) => {
  const { nomeEvento, quantidadeIngressosDisponiveis, ano, imagemEvento } = evento;

  return (
    <div className={styles.cardRelacionadoContainer}>
      <img
        src={imagemEvento}
        alt={nomeEvento}
        className={styles.eventImageCardRelacionado}
      />
      <div className={styles.eventInfoCardRelacionado}>
        <h2>{nomeEvento}</h2>
        <p>{quantidadeIngressosDisponiveis} Ingressos disponíveis</p>
        <p>{ano}</p>
      </div>
    </div>
  );
};

export default EventoRelacionadoCard;