import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import styles from "./Login.module.css"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.removeItem("@PermissionPI:token");
  }, []);

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      
      await signIn({ username, password });
      window.location.href = "/como-funciona";
    },
    [username, password, signIn]
  );

  return (
    <div className={styles['login-container']}>
      <form className={styles['login-box']} onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label>Usuário</label>
          <input
            type="text"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className={styles['form-group']}>
          <label>Senha</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className={styles['form-group']}>
          <button type="submit">Entrar</button>
        </div>
      </form>
    </div>
  );
};

export default Login;