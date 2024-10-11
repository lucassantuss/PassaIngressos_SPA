import { useEffect, useState } from "react";
import axios from "axios"; // TODO Remover depois
import CampoTitulo from "components/CampoTitulo";
import ProximoEventoCard from "components/ProximoEventoCard";

import styles from "./ProximosEventos.module.css";

// TODO Remover depois
const api = axios.create({
  baseURL: "http://localhost:5026/",
});

function ProximosEventos() {
  const [proximosEventos, setProximosEventos] = useState([]);

  useEffect(() => {
    const listarProximosEventos = async () => {
      try {
        // const response = await api.get("/ListarProximosEventos");
        // setProximosEventos(response.data);
      } catch (error) {
        console.error("Erro ao listar próximos eventos:", error);
      }
    };

    listarProximosEventos();
  }, []);

  return (
    <div className={styles.proximosEventosContainer}>
      <CampoTitulo titulo="Próximos eventos" />

      <div className={styles.proximosEventosList}>
        {proximosEventos.map((evento, index) => (
          <ProximoEventoCard
            key={index}
            imageUrl={evento.imageUrl}
            title={evento.title}
            year={evento.year}
          />
        ))}

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
