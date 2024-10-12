import { useEffect, useState } from "react";
import CampoTitulo from "components/CampoTitulo";
import EventoRelacionadoCard from "components/EventoRelacionadoCard";
import api from "services/api";

import styles from "./EventosRelacionados.module.css";

const EventosRelacionados = () => {
  const [eventosRelacionados, setEventosRelacionados] = useState([]);

  useEffect(() => {
    const listarEventosRelacionados = async () => {
      try {
        // Lista os eventos relacionados
        const response = await api.get("/Eventos/ListarEventosRelacionados");
        const eventosRelacionadosData = response.data;

        // Chama o método para buscar as imagens
        const eventosRelacionadosComImagens = await Promise.all(
          eventosRelacionadosData.map(
            async (eventoRel) => {
              if (eventoRel.idArquivoEvento) {
                eventoRel.imagemEvento = `${api.defaults.baseURL}Arquivo/PesquisarArquivoPorId/${eventoRel.idArquivoEvento}`;
              } else {
                eventoRel.imagemEvento = '/images/Event.jpg'; // Imagem padrão se não houver
              }
              return eventoRel;
            }));

        setEventosRelacionados(eventosRelacionadosComImagens);
      } catch (error) {
        console.error("Erro ao listar os próximos eventos:", error);
      }
    };

    listarEventosRelacionados();
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
