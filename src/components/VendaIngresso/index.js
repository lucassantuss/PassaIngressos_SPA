import styles from "./VendaIngresso.module.css";

export default function VendaIngresso() {
  return (
    <div className={styles.vendaIngressoContainer}>
      <div className={styles.formVendaIngressoContainer}>
        <h1>Dados do Evento</h1>
        <form className={styles.formVendaIngresso}>
          <div className={styles.formVendaIngressoGroup}>
            <label>Nome do Evento:</label>
            <input type="text" placeholder="Digite o nome do evento" />
          </div>
          <div className={styles.formVendaIngressoGroup}>
            <label>Local:</label>
            <input type="text" placeholder="Digite o local do evento" />
          </div>
          <div className={styles.formVendaIngressoGroup}>
            <label>Data:</label>
            <input type="text" placeholder="dd/MM/yyyy" />
          </div>
          <div className={styles.formVendaIngressoGroup}>
            <label>Horário:</label>
            <input type="text" placeholder="HH:mm:ss" />
          </div>
          <div className={styles.formVendaIngressoGroup}>
            <label>Tipo Ingresso:</label>
            <input type="text" placeholder="Digite o tipo de ingresso" />
          </div>
          <div className={styles.formVendaIngressoGroup}>
            <label>Valor:</label>
            <input type="text" placeholder="R$ 0,00" />
          </div>
          <button className={styles.botaoAnunciarIngresso} type="submit">
            Anunciar Ingresso
          </button>
        </form>
      </div>

      <div className={styles.imagemVendaIngressoContainer}>
        <img
          src="/images/events/Twenty-One-Pilots-2025.png"
          alt="Poster do Evento"
          className={styles.eventImageVendaIngresso}
        />
      </div>
    </div>
  );
}