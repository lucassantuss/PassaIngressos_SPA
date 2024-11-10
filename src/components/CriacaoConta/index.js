import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import api from "services/api";

import styles from "./CriacaoConta.module.css";

export default function CriacaoConta() {
  const [usuario, setUsuario] = useState({
    login: "",
    senha: "",
    nome: "",
    sexo: "",
    cpf: "",
    rg: "",
    dataNascimento: "",
  });

  const [sexos, setSexos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const listarSexos = async () => {
      try {
        const response = await api.get("TabelaGeral/PesquisarItensPorTabela/TG_SEXO");
        setSexos(response.data);
      } catch (error) {
        console.error("Erro ao listar os sexos:", error);
      }
    };

    listarSexos();
  }, []);

  const onChangeUsuario = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: name === "sexo" ? parseInt(value, 10) : value,
    });
  };

  const validarFormulario = () => {
    const { login, senha, nome, sexo, cpf, rg, dataNascimento } = usuario;

    if (!login.trim()) {
      alert("O login é obrigatório.");
      return false;
    }
    if (!senha.trim()) {
      alert("A senha é obrigatória.");
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
    const dataISO = new Date(`${ano}-${mes}-${dia}T00:00:00.000Z`);
    return dataISO.toISOString();
  };

  const onSubmitUsuario = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    try {
      const usuarioDto = {
        Login: usuario.login,
        Senha: usuario.senha,
        NomePessoa: usuario.nome,
        IdTgSexo: usuario.sexo,
        CPF: usuario.cpf,
        RG: usuario.rg,
        DataNascimento: converterDataParaISO(usuario.dataNascimento), // Converte data para ISO
        IdArquivoFoto: 15, // ID fixo para a imagem padrão
      };

      await api.post("/Acesso/CriarUsuario", usuarioDto, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Usuário criado com sucesso!");

      navigate("/login");
      
      setUsuario({
        login: "",
        senha: "",
        nome: "",
        sexo: "",
        cpf: "",
        rg: "",
        dataNascimento: "",
      });
    } catch (error) {
      alert("Não foi possível criar o usuário. Verifique se todos os campos foram digitados corretamente!");
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
    </div>
  );
}