import EventoDisponivelCard from "components/EventoDisponivelCard";

import styles from "./EventosDisponiveis.module.css";

const EventosDisponiveis = ({ eventosFiltrados }) => {
  return (
    <div>
      {eventosFiltrados.map((evento, index) => (
        <EventoDisponivelCard key={index} evento={evento} />
      ))}
    </div>
  );
};

export default EventosDisponiveis;