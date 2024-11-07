import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import InputMask from "react-input-mask";
import { useAuth } from "context/AuthContext";
import api from "services/api";

import styles from "./VendaIngresso.module.css";

export default function VendaIngresso() {
  const { userLogged, user } = useAuth();
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
    if (userLogged()) {
      const listarTiposIngressos = async () => {
        try {
          const response = await api.get("TabelaGeral/PesquisarItensPorTabela/TG_TIPO_INGRESSO");
          setTiposIngressos(response.data);
        } catch (error) {
          console.error("Erro ao listar os tipos de ingressos:", error);
        }
      };
      listarTiposIngressos();
    }
  }, [userLogged]);

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

  const obterExtensaoArquivo = (fileName) => fileName.split(".").pop();

  const converterParaBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const validarFormulario = () => {
    const { nome, imagem, local, data, horario, tipoIngresso, valor } = ingresso;
    if (!nome.trim()) return alert("O nome do evento é obrigatório."), false;
    if (!imagem) return alert("É necessário selecionar uma imagem para o evento."), false;
    if (!local.trim()) return alert("O local do evento é obrigatório."), false;
    if (!data || !/^\d{2}\/\d{2}\/\d{4}$/.test(data)) return alert("A data do evento é inválida ou não foi preenchida."), false;
    if (!horario || !/^\d{2}:\d{2}:\d{2}$/.test(horario)) return alert("O horário do evento é inválido ou não foi preenchido."), false;
    if (!tipoIngresso) return alert("É necessário selecionar um tipo de ingresso."), false;
    if (!valor || isNaN(parseFloat(valor))) return alert("O valor do ingresso é obrigatório."), false;
    return true;
  };

  const excluirArquivo = async (idArquivo) => {
    try {
      await api.delete(`/Arquivo/ExcluirArquivo/${idArquivo}`);
    } catch (error) {
      console.error("Erro ao excluir arquivo:", error);
    }
  };

  const onSubmitIngresso = async (e) => {
    e.preventDefault();

    if (!userLogged()) {
      alert("Você precisa estar logado para anunciar um ingresso.");
      return;
    }

    if (!validarFormulario()) return;

    let idArquivoEvento = null;
    try {
      let imagemBase64 = "", contentType = "", extensaoImagem = "";
      if (ingresso.imagem) {
        imagemBase64 = await converterParaBase64(ingresso.imagem);
        contentType = ingresso.imagem.type;
        extensaoImagem = obterExtensaoArquivo(ingresso.imagem.name);
      }

      const arquivoDto = {
        ConteudoArquivo: imagemBase64.split(",")[1],
        ContentType: contentType,
        Extensao: extensaoImagem,
        Nome: ingresso.imagem.name
      };

      const arquivoResponse = await api.post("/Arquivo/SalvarArquivo", arquivoDto);
      idArquivoEvento = arquivoResponse.data;

      const dataHoraEvento = `${ingresso.data.split("/").reverse().join("-")}T${ingresso.horario}`;

      const ingressoDto = {
        NomeEvento: ingresso.nome,
        LocalEvento: ingresso.local,
        DataHoraEvento: dataHoraEvento,
        IdTipoIngresso: parseInt(ingresso.tipoIngresso),
        IdPessoaAnunciante: user.idPessoa,
        Valor: parseFloat(ingresso.valor),
        IdArquivoEvento: idArquivoEvento
      };

      await api.post("/Eventos/AnunciarIngresso", ingressoDto, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Ingresso anunciado com sucesso!");
      setIngresso({ nome: "", imagem: null, local: "", data: "", horario: "", tipoIngresso: "", valor: "" });
      setVisualizacaoImagem(null);
    } catch (error) {
      console.error("Erro ao anunciar ingresso:", error);
      if (idArquivoEvento) {
        await excluirArquivo(idArquivoEvento); // Exclui o arquivo se o ingresso falhar ao ser anunciado
      }
    }
  };

  return (
    <div className={styles.vendaIngressoContainer}>
      {userLogged() ? (
        <>
          <div className={styles.formVendaIngressoContainer}>
            <h1>Dados do Evento</h1>
            <form className={styles.formVendaIngresso} onSubmit={onSubmitIngresso}>
              <div className={styles.formVendaIngressoGroup}>
                <label>Nome do Evento:</label>
                <input type="text" name="nome" placeholder="Digite o nome do evento" value={ingresso.nome} onChange={onChangeIngresso} />
              </div>
              <div className={styles.formVendaIngressoGroup}>
                <label>Imagem do Evento:</label>
                <input type="file" name="imagem" accept="image/*" onChange={onChangeIngresso} />
              </div>
              <div className={styles.formVendaIngressoGroup}>
                <label>Local:</label>
                <input type="text" name="local" placeholder="Digite o local do evento" value={ingresso.local} onChange={onChangeIngresso} />
              </div>
              <div className={styles.formVendaIngressoGroup}>
                <label>Data:</label>
                <InputMask mask="99/99/9999" name="data" placeholder="dd/MM/yyyy" value={ingresso.data} onChange={onChangeIngresso} />
              </div>
              <div className={styles.formVendaIngressoGroup}>
                <label>Horário:</label>
                <InputMask mask="99:99:99" name="horario" placeholder="HH:mm:ss" value={ingresso.horario} onChange={onChangeIngresso} />
              </div>
              <div className={styles.formVendaIngressoGroup}>
                <label>Tipo Ingresso:</label>
                <select name="tipoIngresso" value={ingresso.tipoIngresso} onChange={onChangeIngresso}>
                  <option value="">Selecione um tipo de ingresso</option>
                  {tiposIngressos.map((tipo) => (
                    <option key={tipo.idItemTabelaGeral} value={tipo.idItemTabelaGeral}>
                      {tipo.descricao}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formVendaIngressoGroup}>
                <label>Valor:</label>
                <NumericFormat name="valor" placeholder="R$ 0,00" value={ingresso.valor} onValueChange={({ value }) => onChangeIngresso({ target: { name: "valor", value } })} thousandSeparator decimalScale={2} fixedDecimalScale />
              </div>
              <button className={styles.botaoAnunciarIngresso} type="submit">Anunciar Ingresso</button>
            </form>
          </div>
          <div className={styles.imagemVendaIngressoContainer}>
            {visualizacaoImagem && <img src={visualizacaoImagem} alt="Pôster do Evento" title="Pôster do Evento" className={styles.eventImageVendaIngresso} />}
          </div>
        </>
      ) : (
        <p className={styles.mensagemLoginNecessario}>
          Você precisa estar logado para anunciar um ingresso.
        </p>
      )}
    </div>
  );
}