import FormContato from "components/FormContato";
import CampoTitulo from "components/CampoTitulo";

import styles from "./Sobre.module.css";

export default function Sobre() {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.textAndFormContainer}>
        <div className={styles.textAboutContainer}>
          <CampoTitulo titulo="Sobre" />
          <p>
            A <strong>Passa Ingressos</strong> é uma startup brasileira que visa
            simplificar a compra e a revenda de ingressos para eventos,
            conectando pessoas de maneira eficiente e acessível.
          </p>
          <p>
            Nossa equipe de desenvolvimento e idealizadores da startup é
            composta por:
          </p>
          <ul>
            <li>Danilo Rodrigues Dantas</li>
            <li>Lucas Araujo dos Santos</li>
            <li>Renan Cesar de Araujo</li>
          </ul>
          <p>
            Caso haja alguma dúvida, ou sugestão de melhoria para o software,
            fique a vontade para entrar em contato conosco!!
          </p>
        </div>

        <div className={styles.formContatoContainer}>
          <FormContato />
        </div>
      </div>

      <div className={styles.imageAboutContainer}>
        <div className={styles.imageAboutRow}>
          <img
            src="/images/groupMembers/danilo.jpg"
            alt="Danilo Rodrigues Dantas"
            title="Danilo Rodrigues Dantas"
          />
          <img
            src="/images/groupMembers/renan.jpg"
            alt="Renan Cesar de Araujo"
            title="Renan Cesar de Araujo"
          />
        </div>
        <div className={styles.imageAboutRow}>
          <img
            src="/images/groupMembers/lucas.jpg"
            alt="Lucas Araujo dos Santos"
            title="Lucas Araujo dos Santos"
          />
        </div>
      </div>
    </div>
  );
}
