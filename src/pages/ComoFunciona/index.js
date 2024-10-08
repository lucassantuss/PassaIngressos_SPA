import CampoTitulo from "components/CampoTitulo"
import InfoVendaIngresso from "components/InfoVendaIngresso"

import styles from "./ComoFunciona.module.css"

export default function ComoFunciona() {
    return (
        <div>
            <CampoTitulo titulo="Como Funciona?" />
            <InfoVendaIngresso />
        </div>
    )
}