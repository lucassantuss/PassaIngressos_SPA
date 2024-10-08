import styles from "./CampoTitulo.module.css";

const CampoTitulo = ({ titulo }) => {
  return <h1 className={styles.titulo}>{titulo}</h1>;
};

export default CampoTitulo;