import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import api from "services/api";

import styles from "./CriacaoConta.module.css";

export default function CriacaoConta() {
  const [usuario, setUsuario] = useState({
    login: "",
    senha: "",
    foto: null,
    nome: "",
    sexo: "",
    cpf: "",
    rg: "",
    dataNascimento: "",
  });

  const [sexos, setSexos] = useState([]);
  const [visualizacaoImagem, setVisualizacaoImagem] = useState(null);

  useEffect(() => {
    // Função para listar os sexos
    const listarSexos = async () => {
      try {
        const response = await api.get(
          "TabelaGeral/PesquisarItensPorTabela/TG_SEXO"
        );
        setSexos(response.data);
      } catch (error) {
        console.error("Erro ao listar os sexos:", error);
      }
    };

    listarSexos();
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

  const converterParaBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const validarFormulario = () => {
    const { login, senha, foto, nome, sexo, cpf, rg, dataNascimento } = usuario;

    if (!login.trim()) {
      alert("O login é obrigatório.");
      return false;
    }
    if (!senha.trim()) {
      alert("A senha é obrigatória.");
      return false;
    }
    if (!foto) {
      alert("É necessário selecionar uma foto.");
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

  const onSubmitUsuario = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    try {
      // Converte a imagem para base64
      let fotoBase64 = "";
      let contentType = "";

      if (usuario.foto) {
        fotoBase64 = await converterParaBase64(usuario.foto);
        contentType = usuario.foto.type;
      }

      // Primeiro, salva a foto e obtem o IdArquivo
      const arquivoDto = {
        ConteudoArquivo: fotoBase64.split(",")[1],
        ContentType: contentType,
        Extensao: usuario.foto.name.split(".").pop(),
        Nome: usuario.foto.name,
      };

      const arquivoResponse = await api.post(
        "/Arquivo/SalvarArquivo",
        arquivoDto
      );
      const idArquivoFoto = arquivoResponse.data; // Obtem o Id do arquivo salvo

      // Monta o objeto conforme o DTO esperado
      const usuarioDto = {
        Login: usuario.login,
        Senha: usuario.senha,
        NomePessoa: usuario.nome,
        IdTgSexo: usuario.sexo,
        CPF: usuario.cpf,
        RG: usuario.rg,
        DataNascimento: usuario.dataNascimento,
        IdArquivoFoto: idArquivoFoto,
      };

      // Cria o usuário
      await api.post("/Usuario/CriarUsuario", usuarioDto, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Usuário criado com sucesso!");

      // Limpa todos os campos
      setUsuario({
        login: "",
        senha: "",
        foto: null,
        nome: "",
        sexo: "",
        cpf: "",
        rg: "",
        dataNascimento: "",
      });
      setVisualizacaoImagem(null);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  return (
    <div className={styles.criacaoContaContainer}>
      <div className={styles.formCriacaoContaContainer}>
        <h1>Criar Conta</h1>
        <form className={styles.formCriacaoConta} onSubmit={onSubmitUsuario}>
          <div className={styles.formCriacaoContaGroup}>
            <label>Login:</label>
            <input
              type="text"
              name="login"
              placeholder="Digite seu login"
              value={usuario.login}
              onChange={onChangeUsuario}
            />
          </div>
          <div className={styles.formCriacaoContaGroup}>
            <label>Senha:</label>
            <input
              type="password"
              name="senha"
              placeholder="Digite sua senha"
              value={usuario.senha}
              onChange={onChangeUsuario}
            />
          </div>
          <div className={styles.formCriacaoContaGroup}>
            <label>Foto de Perfil:</label>
            <input
              type="file"
              name="foto"
              accept="image/*"
              onChange={onChangeUsuario}
            />
          </div>
          <div className={styles.formCriacaoContaGroup}>
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              placeholder="Digite seu nome"
              value={usuario.nome}
              onChange={onChangeUsuario}
            />
          </div>
          <div className={styles.formCriacaoContaGroup}>
            <label>Sexo:</label>
            <select name="sexo" value={usuario.sexo} onChange={onChangeUsuario}>
              <option value="">Selecione um sexo</option>
              {sexos.map((sexo) => (
                <option
                  key={sexo.idItemTabelaGeral}
                  value={sexo.idItemTabelaGeral}
                >
                  {sexo.descricao}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formCriacaoContaGroup}>
            <label>CPF:</label>
            <InputMask
              mask="999.999.999-99"
              name="cpf"
              placeholder="Digite seu CPF"
              value={usuario.cpf}
              onChange={onChangeUsuario}
            />
          </div>
          <div className={styles.formCriacaoContaGroup}>
            <label>RG:</label>
            <InputMask
              mask="99.999.999-9"
              name="rg"
              placeholder="Digite seu RG"
              value={usuario.rg}
              onChange={onChangeUsuario}
            />
          </div>
          <div className={styles.formCriacaoContaGroup}>
            <label>Data de Nascimento:</label>
            <InputMask
              mask="99/99/9999"
              name="dataNascimento"
              placeholder="dd/MM/yyyy"
              value={usuario.dataNascimento}
              onChange={onChangeUsuario}
            />
          </div>
          <button className={styles.botaoCriarConta} type="submit">
            Criar Conta
          </button>
        </form>
      </div>

      <div className={styles.imagemCriacaoContaContainer}>
        {visualizacaoImagem && (
          <img
            src={visualizacaoImagem}
            alt="Foto de Perfil"
            title="Foto de Perfil"
            className={styles.eventImageCriacaoConta}
          />
        )}
      </div>
    </div>
  );
}
