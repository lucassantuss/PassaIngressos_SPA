import CampoTitulo from "components/CampoTitulo";
import InfoCard from "components/InfoCard";
import styles from "./VenderIngresso.module.css";

export default function VenderIngresso() {
    return (
        <div className={styles.container}>
            <CampoTitulo titulo="Passo a passo - Venda de Ingressos" />

            <div className={styles.cardGrid}>
                <InfoCard
                    icon="person-circle"
                    title="Faça o login com sua conta"
                    text="Para garantir a segurança em suas transações, faça login na sua conta. Isso permitirá que você compre e venda ingressos com total proteção e facilidade. Se ainda não tem uma conta, crie uma agora mesmo!"
                />

                <InfoCard
                    icon="clipboard2-check-fill"
                    title="Preencha os campos necessários"
                    text="Preencha todos os campos obrigatórios com as informações detalhadas sobre o ingresso. Após a conclusão, clique no botão 'Anunciar Ingresso' para finalizar o processo."
                />

                <InfoCard
                    icon="shield-fill-check"
                    title="Venda 100% segura"
                    text="Sem chance de fraude! A transação é feita direto pelo site, oferecendo total segurança para os dois lados."
                />

                <InfoCard
                    icon= "calendar-check"
                    title="O pagamento do ingresso será realizado somente após o evento para evitar golpes!"
                    text="Visando evitar casos de golpes e fraudes, o pagamento do valor do ingresso vendido será feito ao vendedor somente após ocorrer o evento."
                />
            </div>
        </div>
    )
}