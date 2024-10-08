import styles from "./CampoSubtitulo.module.css";

const CampoSubtitulo = ({ subtitulo }) => {
  return <h3 className={styles.subtitulo}>{subtitulo}</h3>;
};

export default CampoSubtitulo;