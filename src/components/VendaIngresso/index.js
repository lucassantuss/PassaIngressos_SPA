import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import InputMask from "react-input-mask";
import api from "services/api";

import styles from "./VendaIngresso.module.css";

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
        const response = await api.get("TabelaGeral/PesquisarItensPorTabela/TG_TIPO_INGRESSO");
        setTiposIngressos(response.data);
      } catch (error) {
        console.error("Erro ao listar os tipos de ingressos:", error);
      }
    };

    listarTiposIngressos();
  }, []);

  const onChangeIngresso = (e) => {
    const { name, value, files } = e.target;

    if (name === "imagem") {
      const file = files[0];
      setIngresso({ ...ingresso, imagem: file });
      setVisualizacaoImagem(URL.createObjectURL(file));
    } else {
      setIngresso({ ...ingresso, [name]: value });
    }
  };

  const obterExtensaoArquivo = (fileName) => {
    return fileName.split(".").pop();
  };

  const converterParaBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const validarFormulario = () => {
    const { nome, imagem, local, data, horario, tipoIngresso, valor } = ingresso;

    if (!nome.trim()) {
      alert("O nome do evento é obrigatório.");
      return false;
    }
    if (!imagem) {
      alert("É necessário selecionar uma imagem para o evento.");
      return false;
    }
    if (!local.trim()) {
      alert("O local do evento é obrigatório.");
      return false;
    }
    if (!data || !/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
      alert("A data do evento é inválida ou não foi preenchida.");
      return false;
    }
    if (!horario || !/^\d{2}:\d{2}:\d{2}$/.test(horario)) {
      alert("O horário do evento é inválido ou não foi preenchido.");
      return false;
    }
    if (!tipoIngresso) {
      alert("É necessário selecionar um tipo de ingresso.");
      return false;
    }
    if (!valor || isNaN(parseFloat(valor))) {
      alert("O valor do ingresso é obrigatório.");
      return false;
    }

    return true;
  };

  const onSubmitIngresso = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    try {
      // Converte a imagem para base64 e extrai as informações necessárias
      let imagemBase64 = "";
      let contentType = "";
      let extensaoImagem = "";

      if (ingresso.imagem) {
        imagemBase64 = await converterParaBase64(ingresso.imagem);
        contentType = ingresso.imagem.type;
        extensaoImagem = obterExtensaoArquivo(ingresso.imagem.name);
      }

      // Primeiro, salva o arquivo e obtem o IdArquivo
      const arquivoDto = {
        ConteudoArquivo: imagemBase64.split(",")[1], // Remove o prefixo base64
        ContentType: contentType,
        Extensao: extensaoImagem,
        Nome: ingresso.imagem.name
      };

      const arquivoResponse = await api.post("/Arquivo/SalvarArquivo", arquivoDto);
      const idArquivoEvento = arquivoResponse.data; // Obtem o Id do arquivo salvo

      // Converte a data e hora (yyyy-MM-ddTHH:mm:ss)
      const dataHoraEvento = `${ingresso.data.split("/").reverse().join("-")}T${ingresso.horario}`;

      // Monta o objeto conforme o DTO esperado
      const ingressoDto = {
        NomeEvento: ingresso.nome,
        LocalEvento: ingresso.local,
        DataHoraEvento: dataHoraEvento,
        IdTipoIngresso: parseInt(ingresso.tipoIngresso),
        IdPessoaAnunciante: 3, // TODO Obter o ID da Pessoa do UsuarioLogado
        Valor: parseFloat(ingresso.valor),
        IdArquivoEvento: idArquivoEvento
      };

      // Anuncia o Ingresso
      await api.post("/Eventos/AnunciarIngresso", ingressoDto, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Ingresso anunciado com sucesso!");

      // Limpa todos os campos
      setIngresso({
        nome: "",
        imagem: null,
        local: "",
        data: "",
        horario: "",
        tipoIngresso: "",
        valor: "",
      });
      setVisualizacaoImagem(null);
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
              name="imagem"
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
                  key={tipo.idItemTabelaGeral}
                  value={tipo.idItemTabelaGeral}
                >
                  {tipo.descricao}
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
            title="Pôster do Evento"
            className={styles.eventImageVendaIngresso}
          />
        )}
      </div>
    </div>
  );
}