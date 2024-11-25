import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfoPassoAPasso from "components/InfoPassoAPasso";
import Botao from "components/Botao";
import CampoTitulo from "components/CampoTitulo";
import api from "services/api";

import styles from "./Evento.module.css";

export default function Evento() {
  const { id } = useParams(); // Pega o ID da URL
  const [ingressos, setIngressos] = useState([]);
  const [eventoAtual, setEventoAtual] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tiposIngressos, setTiposIngressos] = useState({});
  const [ingressoSelecionado, setIngressoSelecionado] = useState(null);

  useEffect(() => {
    const carregarIngressos = async () => {
      try {
        setLoading(true);

        // Busca os ingressos do evento
        const response = await api.get(
          `Eventos/BuscarIngressosPorEvento/${id}`
        );
        const ingressosData = response.data;

        if (ingressosData.length > 0) {
          // Verifica se há uma imagem associada ao evento
          const idArquivoEvento = ingressosData[0].idArquivoEvento;
          const imageUrl = idArquivoEvento
            ? `${api.defaults.baseURL}Arquivo/PesquisarArquivoPorId/${idArquivoEvento}`
            : "/images/Event.jpg"; // Imagem padrão

          // Define o evento atual com os dados relevantes
          setEventoAtual({
            title: ingressosData[0].nomeEvento,
            imageUrl,
          });

          setIngressos(ingressosData);
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

    const carregarTiposIngressos = async () => {
      try {
        const response = await api.get(
          "TabelaGeral/PesquisarItensPorTabela/TG_TIPO_INGRESSO"
        );
        const tiposMap = response.data.reduce((acc, tipo) => {
          acc[tipo.idItemTabelaGeral] = tipo.descricao;
          return acc;
        }, {});
        setTiposIngressos(tiposMap);
      } catch (error) {
        console.error("Erro ao carregar os tipos de ingressos:", error);
      }
    };

    carregarIngressos();
    carregarTiposIngressos();
  }, [id]);

  const handleComprarIngresso = async () => {
    const idUsuarioLogado = localStorage.getItem(
      "@PermissionPI:idUsuarioLogado"
    );

    if (!idUsuarioLogado) {
      alert("Você precisa estar logado para comprar um ingresso.");
      return;
    }

    if (!ingressoSelecionado) {
      alert("Selecione um ingresso para continuar.");
      return;
    }

    try {
      const response = await api.post(
        `Eventos/ComprarIngresso/${ingressoSelecionado}`,
        { IdPessoaComprador: parseInt(idUsuarioLogado) },
        { headers: { "Content-Type": "application/json" } }
      );

      alert(response.data);
    } catch (error) {
      console.error("Erro ao tentar comprar ingresso:", error);

      if (error.response?.status === 400) {
        alert(error.response.data || "Erro nos dados enviados.");
      } else if (error.response?.status === 404) {
        alert("Ingresso não encontrado.");
      } else {
        alert("Ocorreu um erro ao processar a compra. Tente novamente.");
      }
    }
  };

  if (loading) {
    return <CampoTitulo titulo="Carregando ingressos..." />;
  }

  if (!eventoAtual) {
    return (
      <CampoTitulo titulo="Nenhum ingresso encontrado para este evento." />
    );
  }

  const ingressoAtual = ingressos.find(
    (ingresso) => ingresso.idIngresso === Number(ingressoSelecionado)
  );

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
              <label>Ingressos Disponíveis:</label>
              <select
                className={styles.campoSelect}
                onChange={(e) =>
                  setIngressoSelecionado(e.target.value)
                }
              >
                <option value="">Selecione um ingresso</option>
                {ingressos.map((ingresso) => (
                  <option key={ingresso.idIngresso} value={ingresso.idIngresso}>
                    {tiposIngressos[ingresso.idTipoIngresso]} - R${" "}
                    {ingresso.valor.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            {ingressoAtual && (
              <div className={styles.detalhesEvento}>
                <div className={styles.linhaEvento}>
                  <label>Local:</label>
                  <span>{ingressoAtual.localEvento}</span>
                </div>

                <div className={styles.linhaEvento}>
                  <label>Data:</label>
                  <span>{ingressoAtual.dataHoraEvento}</span>
                </div>

                <div className={styles.linhaEvento}>
                  <label>Tipo Ingresso:</label>
                  <span>
                    {tiposIngressos[ingressoAtual.idTipoIngresso] ||
                      "Tipo desconhecido"}
                  </span>
                </div>

                <div className={styles.linhaEvento}>
                  <label>Valor:</label>
                  <span>R$ {ingressoAtual.valor.toFixed(2)}</span>
                </div>
              </div>
            )}

            <Botao
              cn={styles.botaoAdicionar}
              conteudo="Comprar Ingresso"
              onClick={handleComprarIngresso}
            />
          </div>
        </div>
      </div>
      <InfoPassoAPasso tipo="Compra" />
    </>
  );
}