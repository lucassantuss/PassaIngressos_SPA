import { useState, useEffect } from "react";
import Botao from "components/Botao";

import styles from "./BarraPesquisa.module.css";

const BarraPesquisa = ({ placeholder, onSearch, searchTerm }) => {
  const [eventoPesquisado, setEventoPesquisado] = useState("");

  // Atualiza o valor inicial no input de pesquisa quando o searchTerm mudar
  useEffect(() => {
    if (searchTerm) {
      setEventoPesquisado(searchTerm);
    }
  }, [searchTerm]);

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