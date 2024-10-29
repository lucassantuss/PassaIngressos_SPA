import { Link } from "react-router-dom";

import styles from "./EventoDisponivelCard.module.css";

const EventoDisponivelCard = ({ evento, reverse }) => {
  const { idEvento, nomeEvento, quantidadeIngressosDisponiveis, ano, imagemEvento } = evento;
  
  return (
    <div
      className={`${styles.cardDisponivelContainer} ${
        reverse ? styles.reverse : ""
      }`}
    >
      <Link to={`/evento/${idEvento}`}>
        <img
          src={imagemEvento}
          alt={nomeEvento}
          title={nomeEvento}
          className={styles.eventImageCardDisponivel}
        />
      </Link>
      <div className={styles.eventInfoCardDisponivel}>
        <h2>{nomeEvento}</h2>
        <p>{quantidadeIngressosDisponiveis} Ingressos disponíveis</p>
        <p>{ano}</p>
        <Link to={`/evento/${idEvento}`}>
          <button className={styles.viewButtonCardDisponivel}>Visualizar</button>
        </Link>
      </div>
    </div>
  );
};

export default EventoDisponivelCard;