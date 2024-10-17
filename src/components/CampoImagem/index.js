import styles from "./CampoImagem.module.css";

const CampoImagem = ({ src, alt, title }) => {
  return <img src={src} alt={alt} title={title} className={styles.eventImage} />;
};

export default CampoImagem;