import { useState } from "react";
import api from "services/api";

import styles from "./FormContato.module.css";

export default function FormContato() {
  const [dadosContato, setDadosContato] = useState({
    nome: "",
    email: "",
    mensagem: ""
  });

  const onChangeContato = (e) => {
    const { id, value } = e.target;

    setDadosContato((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const onSubmitContato = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/EnviarEmailContato", dadosContato);
      alert("Mensagem enviada com sucesso!");
      setDadosContato({ nome: "", email: "", mensagem: "" }); // Limpa o formulário após envio
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      alert("Erro ao enviar mensagem. Tente novamente.");
    }
  };

  return (
    <div className={styles.formContatoContainer}>
      <h2>Entre em contato!!</h2>
      <form className={styles.formContato} onSubmit={onSubmitContato}>
        <div className={styles.formContatoGroup}>
          <label htmlFor="nome">Nome completo</label>
          <input
            type="text"
            id="nome"
            placeholder="Digite o seu nome completo"
            value={dadosContato.nome}
            onChange={onChangeContato}
            required
          />
        </div>

        <div className={styles.formContatoGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="email@domain.com"
            value={dadosContato.email}
            onChange={onChangeContato}
            required
          />
        </div>

        <div className={styles.formContatoGroup}>
          <label htmlFor="mensagem">Mensagem</label>
          <textarea
            id="mensagem"
            placeholder="Digite a sua mensagem.."
            rows="9"
            value={dadosContato.mensagem}
            onChange={onChangeContato}
            required
          ></textarea>
        </div>

        <button type="submit" className={styles.botaoEnviarFormContato}>
          Enviar
        </button>
      </form>
    </div>
  );
}