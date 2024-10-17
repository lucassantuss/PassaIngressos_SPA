import { useNavigate } from "react-router-dom";
import Banner from "components/Banner";
import ProximosEventos from "components/ProximosEventos";
import SegurancaVendas from "components/SegurancaVendas";
import Feedback from "components/Feedback";

import styles from "./Inicio.module.css";

export default function Inicio() {
  const navigate = useNavigate();

  // Função que redireciona para a página de eventos com o termo pesquisado
  const onSearch = (searchTerm) => {
    if (searchTerm) {
      navigate(`/eventos?search=${searchTerm}`);
    }
  };

  return (
    <div>
      <Banner
        title="Compre e revenda seus ingressos com segurança!"
        subtitle="Se você está à procura de um ingresso para um show que está chegando e ele está muito caro ou já se esgotou no site oficial, encontre pessoas que estão revendendo seus ingressos."
        placeholder="Digite o nome do evento que está interessado.."
        onSearch={onSearch}
        urlImage="/images/banners/show.jpg"
      />

      <ProximosEventos />
      <SegurancaVendas />
      <Feedback />
    </div>
  );
}