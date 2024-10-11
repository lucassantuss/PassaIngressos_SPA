import { useState } from "react";
import Botao from "components/Botao";

import styles from "./BarraPesquisa.module.css";

const BarraPesquisa = ({ placeholder, onSearch }) => {
  const [eventoPesquisado, setEventoPesquisado] = useState("");

  const onChangeSearch = () => {
    onSearch(eventoPesquisado);
  };

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.searchInput}
        value={eventoPesquisado}
        onChange={(e) => setEventoPesquisado(e.target.value)}
      />
      <Botao cn={styles.searchButton} conteudo="Pesquisar" onClick={onChangeSearch} />
    </div>
  );
};

export default BarraPesquisa;