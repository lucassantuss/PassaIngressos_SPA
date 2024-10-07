import EventoRelacionadoCard from 'components/EventoRelacionadoCard';

import styles from '../EventoRelacionadoCard/EventoRelacionadoCard.module.css';

const EventosRelacionados = () => {
  const eventos = [
    {
      title: 'Travis Scott',
      ingressos: 9,
      ano: 2024,
      image: '/images/events/Travis-Scott-2024.png',
    },
    {
      title: 'Twenty One Pilots',
      ingressos: 2,
      ano: 2025,
      image: '/images/events/Twenty-One-Pilots-2025.png',
    },
  ];

  return (
    <div>
      <h2>Eventos relacionados</h2>
      <div className={styles.eventosRelacionados}>
        {eventos.map((evento, index) => (
          <EventoRelacionadoCard key={index} evento={evento} />
        ))}
      </div>
    </div>
  );
};

export default EventosRelacionados;