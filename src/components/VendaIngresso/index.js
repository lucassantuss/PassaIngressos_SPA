import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { NumericFormat } from "react-number-format";

import axios from "axios"; // TODO Remover depois
// import api from "../services/api";

import styles from "./VendaIngresso.module.css";

// TODO Remover depois
const api = axios.create({
  baseURL: "http://localhost:5026/",
});

export default function VendaIngresso() {
  const [ingresso, setIngresso] = useState({
    nome: "",
    imagem: null,
    local: "",
    data: "",
    horario: "",
    tipoIngresso: "",
    valor: "",
  });

  const [tiposIngressos, setTiposIngressos] = useState([]);
  const [visualizacaoImagem, setVisualizacaoImagem] = useState(null);

  useEffect(() => {
    // Função para listar os tipos de ingressos
    const listarTiposIngressos = async () => {
      try {
        // const response = await api.get("/TabelaGeral/ListarTiposIngressos");
        // setTiposIngressos(response.data);
      } catch (error) {
        console.error("Erro ao listar os tipos de ingressos:", error);
      }
    };

    listarTiposIngressos();
  }, []);

  const onChangeIngresso = (e) => {
    const { name, value, files } = e.target;

    if (name === "imagem") {
      setIngresso({ ...ingresso, [name]: files[0] });
      setVisualizacaoImagem(URL.createObjectURL(files[0])); // Cria uma URL para a imagem
    } else {
      setIngresso({ ...ingresso, [name]: value });
    }
  };

  const onSubmitIngresso = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in ingresso) {
      formData.append(key, ingresso[key]);
    }

    try {
      // await api.post("/CriarIngresso", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      console.log(ingresso)
      alert("Ingresso anunciado com sucesso!");
    } catch (error) {
      console.error("Erro ao anunciar ingresso:", error);
    }
  };

  return (
    <div className={styles.vendaIngressoContainer}>
      <div className={styles.formVendaIngressoContainer}>
        <h1>Dados do Evento</h1>
        <form className={styles.formVendaIngresso} onSubmit={onSubmitIngresso}>
          <div className={styles.formVendaIngressoGroup}>
            <label>Nome do Evento:</label>
            <input
              type="text"
              name="nome"
              placeholder="Digite o nome do evento"
              value={ingresso.nome}
              onChange={onChangeIngresso}
            />
          </div>
          <div className={styles.formVendaIngressoGroup}>
            <label>Imagem do Evento:</label>
            <input
              type="file"
              name="imagemEvento"
              accept="image/*"
              onChange={onChangeIngresso}
            />
          </div>
          <div className={styles.formVendaIngressoGroup}>
            <label>Local:</label>
            <input
              type="text"
              name="local"
              placeholder="Digite o local do evento"
              value={ingresso.local}
              onChange={onChangeIngresso}
            />
          </div>
          <div className={styles.formVendaIngressoGroup}>
            <label>Data:</label>
            <InputMask
              mask="99/99/9999"
              name="data"
              placeholder="dd/MM/yyyy"
              value={ingresso.data}
              onChange={onChangeIngresso}
            />
          </div>
          <div className={styles.formVendaIngressoGroup}>
            <label>Horário:</label>
            <InputMask
              mask="99:99:99"
              name="horario"
              placeholder="HH:mm:ss"
              value={ingresso.horario}
              onChange={onChangeIngresso}
            />
          </div>
          <div className={styles.formVendaIngressoGroup}>
            <label>Tipo Ingresso:</label>
            <select
              name="tipoIngresso"
              value={ingresso.tipoIngresso}
              onChange={onChangeIngresso}
            >
              <option value="">Selecione um tipo de ingresso</option>
              {tiposIngressos.map((tipo) => (
                <option
                  key={tipo.IdItemTabelaGeral}
                  value={tipo.IdItemTabelaGeral}
                >
                  {tipo.Descricao}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formVendaIngressoGroup}>
            <label>Valor:</label>
            <NumericFormat
              name="valor"
              placeholder="R$ 0,00"
              value={ingresso.valor}
              onValueChange={({ value }) =>
                onChangeIngresso({ target: { name: "valor", value } })
              }
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale={true}
            />
          </div>
          <button className={styles.botaoAnunciarIngresso} type="submit">
            Anunciar Ingresso
          </button>
        </form>
      </div>

      <div className={styles.imagemVendaIngressoContainer}>
        {visualizacaoImagem && (
          <img
            src={visualizacaoImagem}
            alt="Pôster do Evento"
            className={styles.eventImageVendaIngresso}
          />
        )}
      </div>
    </div>
  );
}