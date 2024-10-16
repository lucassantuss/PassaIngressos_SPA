import CampoTitulo from "components/CampoTitulo";
import InfoCard from "components/InfoCard";

import styles from "./InfoPassoAPasso.module.css";

const passosCompra = [
  {
    icon: "person-circle",
    title: "Faça login na sua conta",
    text: [
      "Acesse sua conta inserindo suas credenciais. Se você ainda não possui uma conta, clique em 'Criar Conta' para se registrar e começar a comprar ingressos.",
    ],
  },
  {
    icon: "search",
    title: "Pesquise o evento desejado",
    text: [
      "Use a barra de busca ou explore as categorias disponíveis para encontrar o evento que você deseja.",
    ],
  },
  {
    icon: "ticket",
    title: "Selecione o ingresso",
    text: [
      "Ao encontrar o evento, clique nele para visualizar os detalhes. Escolha o tipo de ingresso que melhor se adapte às suas necessidades, conferindo preço e localização.",
    ],
  },
  {
    icon: "cart4",
    title: "Adicione ao carrinho",
    text: [
      "Depois de selecionar o tipo de ingresso que deseja, clique em 'Adicionar ao Carrinho'. Isso reserva seu ingresso e permite que você continue explorando outros eventos ou siga diretamente para o pagamento.",
    ],
  },
  {
    icon: "clipboard2-check-fill",
    title: "Revise seu pedido",
    text: [
      "Antes de finalizar a compra, revise os detalhes do ingresso em seu carrinho. Certifique-se de que todas as informações estão corretas, incluindo quantidade e tipo de ingresso.",
    ],
  },
  {
    icon: "credit-card",
    title: "Escolha o método de pagamento",
    text: [
      "Selecione entre as opções de pagamento disponíveis. O sistema oferece diversas alternativas seguras, garantindo que sua transação seja processada com a máxima proteção e confiabilidade.",
    ],
  },
  {
    icon: "check-circle-fill",
    title: "Confirme a compra",
    text: [
      "Após escolher o método de pagamento, clique em 'Finalizar Compra'. Siga as instruções na tela para completar sua transação e obter a confirmação do seu pedido.",
    ],
  },
  {
    icon: "music-note-beamed",
    title: "Aproveite o evento!",
    text: [
      "Após a confirmação da compra, guarde o e-mail ou o comprovante que você receberá. Agora, relaxe e aproveite o evento, sabendo que sua compra foi realizada com segurança.",
    ],
  },
];

const passosVenda = [
  {
    icon: "person-circle",
    title: "Faça o login com sua conta",
    text: [
      "Para garantir a segurança em suas transações, faça login na sua conta. Isso permitirá que você compre e venda ingressos com total proteção e facilidade. Se ainda não tem uma conta, crie uma agora mesmo!",
    ],
  },
  {
    icon: "clipboard2-check-fill",
    title: "Preencha os campos necessários",
    text: [
      "Preencha todos os campos obrigatórios com as informações detalhadas sobre o ingresso. Após a conclusão, clique no botão 'Anunciar Ingresso' para finalizar o processo.",
    ],
  },
  {
    icon: "shield-fill-check",
    title: "Venda 100% segura",
    text: [
      "Sem chance de fraude! A transação é feita direto pelo site, oferecendo total segurança para os dois lados.",
    ],
  },
  {
    icon: "calendar-check",
    title:
      "O pagamento do ingresso será realizado somente após o evento para evitar golpes!",
    text: [
      "Visando evitar casos de golpes e fraudes, o pagamento do valor do ingresso vendido será feito ao vendedor somente após ocorrer o evento.",
    ],
  },
];

export default function InfoPassoAPasso({ tipo }) {
  const passos = tipo === "Compra" ? passosCompra : passosVenda;

  return (
    <div className={styles.infoPassoAPassoContainer}>
      <CampoTitulo titulo={`Passo a passo - ${tipo} de Ingressos`} />

      <div className={styles.cardGridInfoPassoAPasso}>
        {passos.map((passo, index) => (
          <InfoCard
            key={index}
            icon={passo.icon}
            title={passo.title}
            text={passo.text}
          />
        ))}
      </div>
    </div>
  );
}