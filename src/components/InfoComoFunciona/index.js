import CampoTitulo from "components/CampoTitulo";
import InfoCard from "components/InfoCard";

import styles from "./InfoComoFunciona.module.css";

export default function InfoComoFunciona() {
  return (
    <div className={styles.infoComoFuncionaContainer}>
      <div className={styles.cardGridComoFunciona}>
        <CampoTitulo titulo="Como Funciona?" />

        <InfoCard
          text={[
            "Comprar e vender ingressos nunca foi tão simples!",
            "Neste guia, vamos levar você por um passo a passo detalhado, garantindo que sua experiência seja rápida, segura e sem complicações. Se você é um fã de eventos ao vivo ou está interessado em revender seus ingressos, estamos aqui para ajudar.",
            "Para Compradores:",
            "Aprenda a navegar pelo nosso site, desde o login na sua conta até a confirmação da sua compra. Vamos mostrar como encontrar o evento perfeito, selecionar seus ingressos e garantir sua entrada de forma prática e segura.",
            "Para Vendedores:",
            "Descubra como listar seus ingressos à venda. Com nosso sistema intuitivo, você pode anunciar seus ingressos com confiança, sabendo que oferecemos uma plataforma segura para proteger sua transação.",
            "Siga nossas instruções e aproveite ao máximo tudo o que o nosso site tem a oferecer. Vamos começar?",
          ]}
        />
      </div>
    </div>
  );
}