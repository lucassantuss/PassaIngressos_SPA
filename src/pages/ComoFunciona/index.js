import InfoComoFunciona from "components/InfoComoFunciona";
import InfoPassoAPasso from "components/InfoPassoAPasso";

export default function ComoFunciona() {
  return (
    <div>      
      <InfoComoFunciona />
      
      <InfoPassoAPasso tipo="Compra" />
      <InfoPassoAPasso tipo="Venda" />
    </div>
  );
}