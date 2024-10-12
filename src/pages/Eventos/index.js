import { useState, useEffect } from "react";
import Banner from "components/Banner";
import EventosDisponiveis from "components/EventosDisponiveis";
import EventosRelacionados from "components/EventosRelacionados";
import api from "services/api";

import styles from "./Eventos.module.css";

export default function Eventos() {
  const [eventosFiltrados, setEventosFiltrados] = useState([]);

  const onChangeSearch = async (searchTerm) => {
    try {
      if (searchTerm) {
        const response = await api.get(`/Eventos/PesquisarEventosPorNome/${searchTerm}`);
        const eventosDisponiveisData = response.data;

        // Chama o método para buscar as imagens
        const eventosDisponiveisComImagens = await Promise.all(
          eventosDisponiveisData.map(
            async (eventoDisp) => {
              if (eventoDisp.idArquivoEvento) {
                eventoDisp.imagemEvento = `${api.defaults.baseURL}Arquivo/PesquisarArquivoPorId/${eventoDisp.idArquivoEvento}`;
              } else {
                eventoDisp.imagemEvento = '/images/Event.jpg'; // Imagem padrão se não houver
              }
              return eventoDisp;
            }));

        setEventosFiltrados(eventosDisponiveisComImagens);
      } else {
        setEventosFiltrados([]);
      }
    } catch (error) {
      console.error("Erro ao buscar os eventos por nome:", error);
      setEventosFiltrados([]);
    }
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