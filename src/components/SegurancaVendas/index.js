import { Link } from "react-router-dom";

import styles from "./SegurancaVendas.module.css";

function SegurancaVendas() {
  return (
    <div className={styles.segurancaVendasContainer}>
      <div className={styles.textoSegurancaVendasContainer}>
        <h2>Segurança nas vendas!</h2>
        <div className={styles.itensConteudoSegurancaVendas}>
          <br />
          <p><strong>+ chances de ir ao evento</strong></p>
          <p>Encontre pessoas que estão revendendo os ingressos.</p>
          <br />
          <p><strong>100% seguro</strong></p>
          <p>Sem chance de fraude! Com transações feitas diretamente no site.</p>
          <br />
          <p><strong>Pagamento após o evento</strong></p>
          <p>O pagamento do ingresso ao vendedor será realizado somente após o evento para evitar golpes!</p>
          <br />
        </div>
        <Link to="/vender-ingresso">
          <button className={styles.botaoVenderIngressoSegurancaVendas}>Vender Ingresso</button>
        </Link>
      </div>
      <div className={styles.imagemSegurancaVendasContainer}>
        <img
          src="/images/banners/seguranca-vendas.jpg"
          alt="Segurança nas Vendas"
          title="Segurança nas Vendas"
          className={styles.imagemSegurancaVendas}
        />
      </div>
    </div>
  );
}

export default SegurancaVendas;