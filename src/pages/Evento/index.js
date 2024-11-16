import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfoPassoAPasso from "components/InfoPassoAPasso";
import Botao from "components/Botao";
import CampoTitulo from "components/CampoTitulo";
import api from "services/api"; // Certifique-se de que o arquivo de configuração da API está correto

import styles from "./Evento.module.css";

export default function Evento() {
  const { id } = useParams(); // Pega o ID da URL
  const [ingressos, setIngressos] = useState([]);
  const [eventoAtual, setEventoAtual] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarIngressos = async () => {
      try {
        setLoading(true);
        const response = await api.get(`Eventos/BuscarIngressosPorEvento/${id}`);
        const ingressosData = response.data;

        if (ingressosData.length > 0) {
          setIngressos(ingressosData);

        // Obter a imagem através do idArquivoFoto


          const foto = ingressosData.IdArquivoEvento
          ? `${api.defaults.baseURL}Arquivo/PesquisarArquivoPorId/${ingressosData.IdArquivoEvento}`
          : null     ; 

          // Criar um objeto para o evento atual baseado nos ingressos
          setEventoAtual({
            title: ingressosData[0].nomeEvento,
            imageUrl: foto,
            locais: [...new Set(ingressosData.map((ingresso) => ingresso.localEvento))],
            datas: [...new Set(ingressosData.map((ingresso) => ingresso.dataHoraEvento))],
            tiposIngresso: [...new Set(ingressosData.map((ingresso) => ingresso.idTipoIngresso))],
            valores: [...new Set(ingressosData.map((ingresso) => ingresso.valor))],
          });
        } else {
          setIngressos([]);
        }
      } catch (error) {
        console.error("Erro ao carregar ingressos:", error);
        setIngressos([]);
      } finally {
        setLoading(false);
      }
    };

    carregarIngressos();
  }, [id]);

  if (loading) {
    return <CampoTitulo titulo="Carregando ingressos..." />;
  }

  if (!eventoAtual) {
    return <CampoTitulo titulo="Nenhum ingresso encontrado para este evento." />;
  }

  return (
    <>
      <div className={styles.eventoContainer}>
        <div className={styles.imagemEventoContainer}>
          <img
            src={eventoAtual.imageUrl}
            alt={eventoAtual.title}
            title={eventoAtual.title}
            className={styles.imagemEvento}
          />
        </div>

        <div className={styles.infoEventoContainer}>
          <h1 className={styles.tituloEvento}>{eventoAtual.title}</h1>

          <div className={styles.detalhesEvento}>
            <div className={styles.linhaEvento}>
              <label>Local:</label>
              <select className={styles.campoSelect}>
                {eventoAtual.locais.map((local, index) => (
                  <option key={index} value={local}>
                    {local}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.linhaEvento}>
              <label>Data:</label>
              <select className={styles.campoSelect}>
                {eventoAtual.datas.map((data, index) => (
                  <option key={index} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.linhaEvento}>
              <label>Tipo Ingresso:</label>
              <select className={styles.campoSelect}>
                {eventoAtual.tiposIngresso.map((tipo, index) => (
                  <option key={index} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.linhaEvento}>
              <label>Valor:</label>
              <select className={styles.campoSelect}>
                {eventoAtual.valores.map((valor, index) => (
                  <option key={index} value={valor}>
                    R$ {valor.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            <Botao
              cn={styles.botaoAdicionar}
              conteudo="Adicionar ao Carrinho"
            />
          </div>
        </div>
      </div>
      <InfoPassoAPasso tipo="Compra" />
    </>
  );
}
