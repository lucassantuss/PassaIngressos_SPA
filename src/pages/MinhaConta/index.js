import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import api from "services/api";

import styles from "./MinhaConta.module.css";

export default function MinhaConta() {
  const [usuario, setUsuario] = useState({
    login: "",
    foto: null,
    nome: "",
    sexo: "",
    cpf: "",
    rg: "",
    dataNascimento: "",
  });
  const [sexos, setSexos] = useState([]);
  const [visualizacaoImagem, setVisualizacaoImagem] = useState(null);
  const [fotoAlterada, setFotoAlterada] = useState(false);

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
      const idUsuarioLogado = localStorage.getItem("@PermissionPI:idUsuarioLogado");
      if (!idUsuarioLogado) {
        console.error("ID do usuário logado não encontrado.");
        return;
      }

      try {
        const { data } = await api.get(`Acesso/PesquisarUsuarioPorId/${idUsuarioLogado}`);
        
        const usuarioData = {
          login: data.login,
          nome: data.nomePessoa,
          sexo: data.idTgSexo,
          cpf: data.cpf,
          rg: data.rg,
          dataNascimento: data.dataNascimento || "",
          foto: data.idArquivoFoto
            ? `${api.defaults.baseURL}Arquivo/PesquisarArquivoPorId/${data.idArquivoFoto}`
            : null,
        };
        setUsuario({
          ...usuarioData,
          dataNascimento: formatarDataParaInput(usuarioData.dataNascimento)
        });
        setVisualizacaoImagem(usuarioData.foto);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    };

    listarSexos();
    carregarUsuario();
  }, []);

  const formatarDataParaInput = (data) => {
    if (!data) return "";  
    const [ano, mes, dia] = data.split("T")[0].split("-");  
    return `${dia}/${mes}/${ano}`;
  };

  const onChangeUsuario = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto") {
      const file = files[0];
      setUsuario({ ...usuario, foto: file });
      setVisualizacaoImagem(URL.createObjectURL(file));
      setFotoAlterada(true);
    } else {
      setUsuario({ ...usuario, [name]: value });
    }
  };

  const validarFormulario = () => {
    const { login, nome, sexo, cpf, rg, dataNascimento } = usuario;

    if (!login.trim()) {
      alert("O login é obrigatório.");
      return false;
    }
    if (!nome.trim()) {
      alert("O nome é obrigatório.");
      return false;
    }
    if (!sexo) {
      alert("É necessário selecionar um sexo.");
      return false;
    }
    if (!cpf.trim()) {
      alert("O CPF é obrigatório.");
      return false;
    }
    if (!rg.trim()) {
      alert("O RG é obrigatório.");
      return false;
    }
    if (!dataNascimento) {
      alert("A data de nascimento é obrigatória.");
      return false;
    }

    return true;
  };

  const converterDataParaISO = (data) => {
    const [dia, mes, ano] = data.split("/");
    return new Date(`${ano}-${mes}-${dia}T00:00:00.000Z`).toISOString();
  };

  const excluirArquivo = async (idArquivo) => {
    try {
      await api.delete(`/Arquivo/ExcluirArquivo/${idArquivo}`);
    } catch (error) {
      console.error("Erro ao excluir arquivo:", error);
    }
  };

  const onSubmitUsuario = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }
    
    const idUsuarioLogado = localStorage.getItem("@PermissionPI:idUsuarioLogado");
    if (!idUsuarioLogado) {
      console.error("ID do usuário logado não encontrado.");
      return;
    }

    let idArquivoFoto = usuario.foto && fotoAlterada && typeof usuario.foto !== "string" 
      ? null 
      : usuario.foto?.split("/").pop();

    try {
      if (fotoAlterada && usuario.foto && typeof usuario.foto !== "string") {
        const fotoBase64 = await converterParaBase64(usuario.foto);
        const contentType = usuario.foto.type;

        const arquivoDto = {
          ConteudoArquivo: fotoBase64.split(",")[1],
          ContentType: contentType,
          Extensao: usuario.foto.name.split(".").pop(),
          Nome: usuario.foto.name,
        };

        const arquivoResponse = await api.post("Arquivo/SalvarArquivo", arquivoDto);
        idArquivoFoto = arquivoResponse.data;
      }

      const usuarioAtualizadoDto = {
        Login: usuario.login,
        NomePessoa: usuario.nome,
        IdTgSexo: parseInt(usuario.sexo),
        CPF: usuario.cpf,
        RG: usuario.rg,
        DataNascimento: converterDataParaISO(usuario.dataNascimento),
        IdArquivoFoto: idArquivoFoto ? parseInt(idArquivoFoto) : null,
      };

      await api.put(`Acesso/AlterarUsuario/${idUsuarioLogado}`, usuarioAtualizadoDto);

      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      if (idArquivoFoto && fotoAlterada) await excluirArquivo(idArquivoFoto);
      alert("Erro ao atualizar dados da conta.");
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
            <input type="text" name="login" value={usuario.login} disabled />
          </div>
          <div className={styles.formMinhaContaGroup}>
            <label>Foto de Perfil:</label>
            <input type="file" name="foto" accept="image/*" onChange={onChangeUsuario} />
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