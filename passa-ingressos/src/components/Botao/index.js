import styles from './Botao.module.css';

const Botao = ({ cn, conteudo}) => {

  return (
    <button className={cn}>{conteudo}</button>
  );
};

export default Botao;