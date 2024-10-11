import { useEffect, useState } from "react";
import axios from "axios"; // TODO Remover depois

import CampoTitulo from "components/CampoTitulo";
import EventoRelacionadoCard from "components/EventoRelacionadoCard";

import styles from "./EventosRelacionados.module.css";

// TODO Remover depois
const api = axios.create({
  baseURL: "http://localhost:5026/",
});

const EventosRelacionados = () => {
  const eventosRelacionados = [
    {
      title: "Travis Scott",
      ingressos: 9,
      ano: 2024,
      image: "/images/events/Travis-Scott-2024.png",
    },
    {
      title: "Twenty One Pilots",
      ingressos: 2,
      ano: 2025,
      image: "/images/events/Twenty-One-Pilots-2025.png",
    },
  ];

  // const [eventosRelacionados, setEventosRelacionados] = useState([]);

  useEffect(() => {
    const pesquisarEventosRelacionados = async () => {
      try {
        // const response = await api.get("/ListarEventosRelacionados");
        // setEventosRelacionados(response.data);
      } catch (error) {
        console.error("Erro ao buscar os eventos relacionados:", error);
      }
    };

    pesquisarEventosRelacionados();
  }, []);

  return (
    <div>
      <CampoTitulo titulo="Eventos relacionados" />

      <div className={styles.eventosRelacionadosContainer}>
        {eventosRelacionados.map((evento, index) => (
          <EventoRelacionadoCard key={index} evento={evento} />
        ))}
      </div>
    </div>
  );
};

export default EventosRelacionados;
