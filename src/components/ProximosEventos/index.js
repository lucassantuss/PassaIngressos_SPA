import { useEffect, useState } from "react";
import CampoTitulo from "components/CampoTitulo";
import ProximoEventoCard from "components/ProximoEventoCard";
import api from "services/api";

import styles from "./ProximosEventos.module.css";

function ProximosEventos() {
  const [proximosEventos, setProximosEventos] = useState([]);

  useEffect(() => {
    const listarProximosEventos = async () => {
      try {
        // Lista os próximos eventos
        const response = await api.get("/Eventos/ListarProximosEventos");
        const proximosEventosData = response.data;

        // Chama o método para buscar as imagens
        const proximosEventosComImagens = await Promise.all(
          proximosEventosData.map(
            async (proxEvento) => {
              if (proxEvento.idArquivoEvento) {
                proxEvento.imagemEvento = `${api.defaults.baseURL}Arquivo/PesquisarArquivoPorId/${proxEvento.idArquivoEvento}`;
              } else {
                proxEvento.imagemEvento = '/images/Event.jpg'; // Imagem padrão se não houver
              }
              return proxEvento;
            }));

        setProximosEventos(proximosEventosComImagens);
      } catch (error) {
        console.error("Erro ao listar os próximos eventos:", error);
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
            title={evento.nomeEvento}
            year={evento.ano}
            imageUrl={evento.imagemEvento}
          />
        ))}
      </div>
    </div>
  );
}

export default ProximosEventos;