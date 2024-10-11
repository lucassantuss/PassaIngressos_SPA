import styles from "./Botao.module.css";

const Botao = ({ cn, conteudo, onClick }) => {
  return <button className={`${styles.button} ${cn}`} onClick={onClick}>{conteudo}</button>;
};

export default Botao;