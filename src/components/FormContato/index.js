import styles from "./FormContato.module.css";

export default function FormContato() {
  return (
    <div className={styles.formContatoContainer}>
      <h2>Entre em contato!!</h2>
      <form className={styles.formContato}>
        <div className={styles.formContatoGroup}>
          <label htmlFor="name">Nome completo</label>
          <input
            type="text"
            id="name"
            placeholder="Digite o seu nome completo"
          />
        </div>

        <div className={styles.formContatoGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="email@domain.com" />
        </div>

        <div className={styles.formContatoGroup}>
          <label htmlFor="message">Mensagem</label>
          <textarea
            id="message"
            placeholder="Digite a sua mensagem.."
            rows="9"
          ></textarea>
        </div>

        <button type="submit" className={styles.botaoEnviarFormContato}>
          Enviar
        </button>
      </form>
    </div>
  );
}
