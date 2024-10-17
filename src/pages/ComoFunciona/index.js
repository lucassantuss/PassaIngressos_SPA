import InfoComoFunciona from "components/InfoComoFunciona";
import InfoPassoAPasso from "components/InfoPassoAPasso";

import styles from "./ComoFunciona.module.css";

export default function ComoFunciona() {
  return (
    <div>      
      <InfoComoFunciona />
      
      <InfoPassoAPasso tipo="Compra" />
      <InfoPassoAPasso tipo="Venda" />
    </div>
  );
}