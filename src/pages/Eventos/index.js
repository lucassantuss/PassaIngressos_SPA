import Banner from "components/Banner";
import EventosDisponiveis from "components/EventosDisponiveis";
import EventosRelacionados from "components/EventosRelacionados";

import styles from "./Eventos.module.css";

export default function Eventos() {
  return (
    <div>
      <Banner
        title="Eventos Disponíveis"
        subtitle="Confira os ingressos disponíveis atualmente para compra"
        placeholder="Digite o nome do evento.."
        urlImage="/images/banners/show-2.jpg"
      />
      <EventosDisponiveis />
      <EventosRelacionados />
    </div>
  );
}