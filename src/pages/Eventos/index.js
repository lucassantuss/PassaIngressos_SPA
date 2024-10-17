import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Banner from "components/Banner";
import EventosDisponiveis from "components/EventosDisponiveis";
import EventosRelacionados from "components/EventosRelacionados";
import api from "services/api";

import styles from "./Eventos.module.css";

export default function Eventos() {

  const navigate = useNavigate();

  // Função que atualiza a página com o termo pesquisado
  const onSearch = (searchTerm) => {
    if (searchTerm) {
      navigate(`/eventos?search=${searchTerm}`);
    }
  };

  const [eventosFiltrados, setEventosFiltrados] = useState([]);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search');  // Pega o evento pesquisado da URL

  useEffect(() => {
    const fetchEventos = async () => {
      if (searchTerm) {
        try {
          const response = await api.get(`/Eventos/PesquisarEventosPorNome/${searchTerm}`);
          const eventosDisponiveisData = response.data;

          const eventosDisponiveisComImagens = await Promise.all(
            eventosDisponiveisData.map(async (eventoDisp) => {
              if (eventoDisp.idArquivoEvento) {
                eventoDisp.imagemEvento = `${api.defaults.baseURL}Arquivo/PesquisarArquivoPorId/${eventoDisp.idArquivoEvento}`;
              } else {
                eventoDisp.imagemEvento = '/images/Event.jpg'; // Imagem padrão se não houver
              }
              return eventoDisp;
            })
          );

          setEventosFiltrados(eventosDisponiveisComImagens);
        } catch (error) {
          console.error("Erro ao buscar os eventos por nome:", error);
          setEventosFiltrados([]);
        }
      }
    };

    fetchEventos();
  }, [searchTerm]);

  return (
    <div>
      <Banner
        title="Eventos Disponíveis"
        subtitle="Confira os ingressos disponíveis atualmente para compra"
        placeholder="Digite o nome do evento.."
        searchTerm={searchTerm}
        onSearch={onSearch}
        urlImage="/images/banners/show-2.jpg"
      />
      <EventosDisponiveis eventosFiltrados={eventosFiltrados} />
      <EventosRelacionados />
    </div>
  );
}