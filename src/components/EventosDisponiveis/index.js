import { Link } from "react-router-dom";
import EventoDisponivelCard from "components/EventoDisponivelCard";

import styles from "./EventosDisponiveis.module.css";

const EventosDisponiveis = ({ eventosFiltrados }) => {
  return (
    <div className={styles.eventosDisponiveisContainer}>
      {eventosFiltrados.map((evento, index) => (
        <Link key={evento.idEvento} to={`/evento/${evento.idEvento}`} className={styles.cardLink}>
          <EventoDisponivelCard key={index} evento={evento} />
        </Link>
      ))}
    </div>
  );
};

export default EventosDisponiveis;