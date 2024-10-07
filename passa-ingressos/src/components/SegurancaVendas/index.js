import styles from './SegurancaVendas.module.css';

function SegurancaVendas() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2>Segurança nas vendas!</h2>
        <div className={styles.securityContent}>
          <br/>
          <p><strong>Dinheiro + rápido</strong></p>
          <p>Revenda o seu ingresso que não irá usar e receba na hora.</p>
          <br/>
          <p><strong>100% seguro</strong></p>
          <p>Sem chance de fraude! Com transações feitas diretamente no site.</p>
          <br/>
          <p><strong>+ chances de ir ao evento</strong></p>
          <p>Encontre pessoas que estão revendendo os ingressos.</p>
          <br/>
        </div>
        <button className={styles.sellButton}>Vender Ingresso</button>
      </div>
      <div className={styles.imageContainer}>
        <img src="/images/banners/seguranca-vendas.jpg" alt="Segurança nas Vendas" className={styles.securityImage} />
      </div>
    </div>
  );
}

export default SegurancaVendas;