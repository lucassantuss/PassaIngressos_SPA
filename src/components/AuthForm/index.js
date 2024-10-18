import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Botao from "components/Botao";

import styles from "./AuthForm.module.css";

const AuthForm = ({ tipo }) => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (tipo === "login") {
      alert("Login bem-sucedido!");
    } else if (tipo === "esqueci-senha") {
      alert("Senha alterada com sucesso!");
    }
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.removeItem("@PermissionPI:token");
  }, []);

  const { signIn } = useAuth();

  const handleSubmitAntigo = useCallback(
    async (event) => {
      event.preventDefault();

      await signIn({ username, password });
      window.location.href = "/como-funciona";
    },
    [username, password, signIn]
  );

  return (
    <div className={styles["auth-container"]}>
      <form className={styles["auth-box"]} onSubmit={handleSubmit}>
        {tipo === "login" && (
          <>
            <div className={styles["form-group"]}>
              <label>Usuário</label>
              <input
                type="text"
                value={usuario}
                placeholder="Digite seu usuário"
                onChange={(event) => setUsuario(event.target.value)}
                required
              />
            </div>

            <div className={styles["form-group"]}>
              <label>Senha</label>
              <input
                type="password"
                value={senha}
                placeholder="Digite sua senha"
                onChange={(event) => setSenha(event.target.value)}
                required
              />
            </div>
          </>
        )}

        {tipo === "esqueci-senha" && (
          <>
            <div className={styles["form-group"]}>
              <label>Usuário</label>
              <input
                type="text"
                value={usuario}
                placeholder="Digite seu usuário"
                onChange={(event) => setUsuario(event.target.value)}
                required
              />
            </div>

            <div className={styles["form-group"]}>
              <label>Nova Senha</label>
              <input
                type="password"
                value={senha}
                placeholder="Digite a senha nova"
                onChange={(event) => setSenha(event.target.value)}
                required
              />
            </div>
          </>
        )}

        <div className={styles["form-group"]}>
          <Botao
            cn={styles.botao}
            conteudo={tipo === "login" ? "Entrar" : "Alterar Senha"}
          />
        </div>

        {tipo === "login" && (
          <div className={styles["form-actions"]}>
            <Link to="/criar-conta">
              <button type="button" className={styles.linkLeft}>
                Criar Conta
              </button>
            </Link>

            <Link to="/esqueci-senha">
              <button type="button" className={styles.linkRight}>
                Esqueci minha senha
              </button>
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default AuthForm;