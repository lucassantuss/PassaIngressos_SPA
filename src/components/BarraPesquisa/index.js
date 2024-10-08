import Botao from "components/Botao";

import styles from "./BarraPesquisa.module.css";

const BarraPesquisa = ({ placeholder }) => {
  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.searchInput}
      />

      <Botao cn={styles.searchButton} conteudo="Pesquisar" />
    </div>
  );
};

export default BarraPesquisa;