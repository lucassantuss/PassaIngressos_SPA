import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import api from "services/api";

import styles from "./MinhaConta.module.css";

export default function MinhaConta() {
  const [usuario, setUsuario] = useState({
    login: "lucas.santos",
    foto: null,
    nome: "Lucas Araujo dos Santos",
    sexo: "Masculino",
    cpf: "123.456.789-01",
    rg: "12.345.678-9",
    dataNascimento: "09/10/2002",
  });
  const [sexos, setSexos] = useState([]);
  const [visualizacaoImagem, setVisualizacaoImagem] = useState(null);

  useEffect(() => {
    const listarSexos = async () => {
      try {
        const response = await api.get("TabelaGeral/PesquisarItensPorTabela/TG_SEXO");
        setSexos(response.data);
      } catch (error) {
        console.error("Erro ao listar os sexos:", error);
      }
    };

    const carregarUsuario = async () => {
      try {
        const response = await api.get("/Usuario/ObterUsuarioLogado");
        const usuarioData = response.data;

        // Converte a foto em URL para visualização
        if (usuarioData.idArquivoFoto) {
          usuarioData.foto = `${api.defaults.baseURL}Arquivo/PesquisarArquivoPorId/${usuarioData.idArquivoFoto}`;
        }
        setUsuario(usuarioData);
        setVisualizacaoImagem(usuarioData.foto);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    };

    listarSexos();
    carregarUsuario();
  }, []);

  const onChangeUsuario = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto") {
      const file = files[0];
      setUsuario({ ...usuario, foto: file });
      setVisualizacaoImagem(URL.createObjectURL(file));
    } else {
      setUsuario({ ...usuario, [name]: value });
    }
  };

  const onSubmitUsuario = async (e) => {
    e.preventDefault();
    try {
      let fotoBase64 = "";
      let contentType = "";
      if (usuario.foto) {
        fotoBase64 = await converterParaBase64(usuario.foto);
        contentType = usuario.foto.type;
      }

      const usuarioDto = {
        Login: usuario.login,
        NomePessoa: usuario.nome,
        IdTgSexo: usuario.sexo,
        CPF: usuario.cpf,
        RG: usuario.rg,
        DataNascimento: usuario.dataNascimento,
      };

      // Atualiza o usuário
      await api.put("/Usuario/AtualizarUsuario", usuarioDto, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (usuario.foto) {
        const arquivoDto = {
          ConteudoArquivo: fotoBase64.split(",")[1],
          ContentType: contentType,
          Extensao: usuario.foto.name.split(".").pop(),
          Nome: usuario.foto.name,
        };

        await api.post("/Arquivo/SalvarArquivo", arquivoDto);
      }

      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  const converterParaBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className={styles.minhaContaContainer}>
      <div className={styles.formMinhaContaContainer}>
        <h1>Minha Conta</h1>
        <form className={styles.formMinhaConta} onSubmit={onSubmitUsuario}>
          <div className={styles.formMinhaContaGroup}>
            <label>Login:</label>
            <input
              type="text"
              name="login"
              value={usuario.login}
              onChange={onChangeUsuario}
              disabled
            />
          </div>
          <div className={styles.formMinhaContaGroup}>
            <label>Foto de Perfil:</label>
            <input
              type="file"
              name="foto"
              accept="image/*"
              onChange={onChangeUsuario}
            />
          </div>
          <div className={styles.formMinhaContaGroup}>
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={usuario.nome}
              onChange={onChangeUsuario}
            />
          </div>
          <div className={styles.formMinhaContaGroup}>
            <label>Sexo:</label>
            <select name="sexo" value={usuario.sexo} onChange={onChangeUsuario}>
              <option value="">Selecione um sexo</option>
              {sexos.map((sexo) => (
                <option key={sexo.idItemTabelaGeral} value={sexo.idItemTabelaGeral}>
                  {sexo.descricao}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formMinhaContaGroup}>
            <label>CPF:</label>
            <InputMask
              mask="999.999.999-99"
              name="cpf"
              value={usuario.cpf}
              onChange={onChangeUsuario}
            />
          </div>
          <div className={styles.formMinhaContaGroup}>
            <label>RG:</label>
            <InputMask
              mask="99.999.999-9"
              name="rg"
              value={usuario.rg}
              onChange={onChangeUsuario}
            />
          </div>
          <div className={styles.formMinhaContaGroup}>
            <label>Data de Nascimento:</label>
            <InputMask
              mask="99/99/9999"
              name="dataNascimento"
              value={usuario.dataNascimento}
              onChange={onChangeUsuario}
            />
          </div>
          <button className={styles.botaoAtualizarConta} type="submit">
            Atualizar Conta
          </button>
        </form>
      </div>

      <div className={styles.imagemMinhaContaContainer}>
        {visualizacaoImagem && (
          <img
            src={visualizacaoImagem}
            alt="Foto de Perfil"
            title="Foto de Perfil"
            className={styles.eventImageMinhaConta}
          />
        )}
      </div>
    </div>
  );
}