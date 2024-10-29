import EventoDisponivelCard from "components/EventoDisponivelCard";

import styles from "./EventosDisponiveis.module.css";

const EventosDisponiveis = ({ eventosFiltrados }) => {
  return (
    <div className={styles.eventosDisponiveisContainer}>
      {eventosFiltrados.map((evento, index) => (
        <EventoDisponivelCard
          key={evento.idEvento}
          evento={evento}
          reverse={index % 2 !== 0}
        />
      ))}
    </div>
  );
};

export default EventosDisponiveis;