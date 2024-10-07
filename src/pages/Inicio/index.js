import ProximosEventos from "components/ProximosEventos";
import SegurancaVendas from "components/SegurancaVendas";
import Feedback from "components/Feedback";

import styles from "./Inicio.module.css"
import CampoTitulo from "components/CampoTitulo";
import CampoSubtitulo from "components/CampoSubtitulo";
import BarraPesquisa from "components/BarraPesquisa";

export default function Inicio() {
    return (
        <div>
          <CampoTitulo titulo="Compre e revenda seus ingressos com segurança!"/>
          <CampoSubtitulo subtitulo="Se você está à procura de um ingresso para um show que está chegando e ele está muito caro ou já se esgotou no site oficial, encontre pessoas que estão revendendo seus ingressos."/>
          <div>
            <BarraPesquisa placeholder="Digite o nome do evento.."/>
          </div>
          
          <ProximosEventos />
          <SegurancaVendas />
          <Feedback />
        </div>
      );
}