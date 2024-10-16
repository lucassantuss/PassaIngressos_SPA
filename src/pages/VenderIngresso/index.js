import InfoPassoAPasso from "components/InfoPassoAPasso";
import VendaIngresso from "components/VendaIngresso";

import styles from "./VenderIngresso.module.css";

export default function VenderIngresso() {
    return (
        <div>
            <InfoPassoAPasso tipo="Venda" />
            <VendaIngresso />
        </div>
    )
}