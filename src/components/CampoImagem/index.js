import styles from "./CampoImagem.module.css";

const CampoImagem = ({ src, alt }) => {
  return <img src={src} alt={alt} className={styles.eventImage} />;
};

export default CampoImagem;