import EventoDisponivelCard from "components/EventoDisponivelCard";

import styles from "./EventosDisponiveis.module.css";

const EventosDisponiveis = () => {
  const eventos = [
    {
      title: "The Weeknd",
      ingressos: 3,
      ano: 2024,
      image: "/images/events/The-Weeknd-2024.jpg",
      reverse: true,
    },
    {
      title: "Bruno Mars",
      ingressos: 7,
      ano: 2024,
      image: "/images/events/Bruno-Mars-2024.png",
      reverse: false,
    },
  ];

  return (
    <div>
      {eventos.map((evento, index) => (
        <EventoDisponivelCard key={index} evento={evento} />
      ))}
    </div>
  );
};

export default EventosDisponiveis;