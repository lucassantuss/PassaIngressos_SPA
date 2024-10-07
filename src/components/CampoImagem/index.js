import styles from './CampoImagem.module.css';

const CampoImagem = ({ iamgem }) => {
  const { src, alt } = iamgem;

  return (
      <img src={src} alt={alt} className={styles.eventImage} />
  );
};

export default CampoImagem;