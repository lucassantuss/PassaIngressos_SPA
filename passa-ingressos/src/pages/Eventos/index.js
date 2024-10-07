import EventosDisponiveis from "components/EventosDisponiveis"
import EventosRelacionados from "components/EventosRelacionados"

import styles from "./Eventos.module.css"

export default function Eventos() {
    return (
      <div>
        <EventosDisponiveis 
          title="Eventos Disponíveis" 
          subtitle="Confira os ingressos disponíveis atualmente para compra"
          urlImage="/public/images/banners/show-2.jpg"
        />
        <EventosRelacionados />
      </div>
    )
}