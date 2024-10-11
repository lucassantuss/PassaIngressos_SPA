import { useState, useEffect } from "react";
import Banner from "components/Banner";
import EventosDisponiveis from "components/EventosDisponiveis";
import EventosRelacionados from "components/EventosRelacionados";

import axios from "axios"; // TODO Remover depois

import styles from "./Eventos.module.css";

// TODO Remover depois
const api = axios.create({
  baseURL: "http://localhost:5026/",
});

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [eventosFiltrados, setEventosFiltrados] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        // const response = await api.get("/ListarEventosDisponiveis");
        // setEventos(response.data);
        // setEventosFiltrados(response.data); // Inicialmente, todos os eventos são filtrados
      } catch (error) {
        console.error("Erro ao buscar os eventos:", error);
      }
    };

    fetchEventos();
  }, []);

  const onChangeSearch = (searchTerm) => {
    const filteredEvents = eventos.filter((evento) =>
      evento.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setEventosFiltrados(filteredEvents);
  };

  return (
    <div>
      <Banner
        title="Eventos Disponíveis"
        subtitle="Confira os ingressos disponíveis atualmente para compra"
        placeholder="Digite o nome do evento.."
        urlImage="/images/banners/show-2.jpg"
        onSearch={onChangeSearch}
      />
      <EventosDisponiveis eventosFiltrados={eventosFiltrados} />
      <EventosRelacionados />
    </div>
  );
}