import { Link } from "react-router-dom";
import EventoDisponivelCard from "components/EventoDisponivelCard";

import styles from "./EventosDisponiveis.module.css";

const EventosDisponiveis = ({ eventosFiltrados }) => {
  return (
    <div>
      {eventosFiltrados.map((evento, index) => (
        <Link key={evento.id} to={`/evento/${evento.id}`}>
          <EventoDisponivelCard key={index} evento={evento} />
        </Link>
      ))}
    </div>
  );
};

export default EventosDisponiveis;