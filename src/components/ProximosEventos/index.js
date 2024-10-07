import ProximoEventoCard from 'components/ProximoEventoCard';
import styles from './ProximosEventos.module.css';

function ProximosEventos() {
  return (
    <div className={styles.events}>
      <h2>Próximos eventos</h2>

      <div className={styles.eventList}>
        <ProximoEventoCard
          imageUrl="/images/events/The-Weeknd-2024.jpg"
          title="The Weeknd"
          year="2024"
        />

        <ProximoEventoCard
          imageUrl="/images/events/Travis-Scott-2024.png"
          title="Travis Scott"
          year="2024"
        />

        <ProximoEventoCard
          imageUrl="/images/events/Bruno-Mars-2024.png"
          title="Bruno Mars"
          year="2024"
        />
      </div>
    </div>
  );
}

export default ProximosEventos;