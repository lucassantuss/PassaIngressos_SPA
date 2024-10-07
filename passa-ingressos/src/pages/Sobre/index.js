import FormContato from "components/FormContato";
import styles from "./Sobre.module.css"
import CampoTitulo from "components/CampoTitulo";

export default function Sobre() {
    return (
        <div className={styles.aboutContainer}>
            <div className="row">
            <div className={styles.textContainer}>
                <CampoTitulo titulo="Sobre"/>

                <p>A Passa Ingressos é uma startup brasileira, com o intuito de facilitar a revenda e compra de ingressos para eventos por meio de uma plataforma que possa conectar as pessoas.</p>
                <p>Na equipe de desenvolvimento do projeto e idealizadores da startup, temos:</p>
                <ul>
                    <li>Danilo Rodrigues Dantas</li>
                    <li>Lucas Araujo dos Santos</li>
                    <li>Renan Cesar de Araujo</li>
                </ul>
                <p>Caso haja alguma dúvida, ou sugestão de melhoria para o software, fique a vontade para entrar em contato conosco!!</p>
            </div>
            </div>

            <div className={styles.imageContainer}>
                <div className={styles.imageRow}>
                    <img src='/images/groupMembers/danilo.jpg' alt="Danilo Rodrigues Dantas" width="250px" height="250px" />
                    <img src='/images/groupMembers/renan.jpg' alt="Renan Cesar de Araujo" width="250px" height="250px" />
                </div>
                <div className={styles.imageRow}>
                    <img src='/images/groupMembers/lucas.jpg' alt="Lucas Araujo dos Santos" width="250px" height="250px" />
                </div>
            </div>
            <br />
            {/* <FormContato /> */}
        </div>
    );
}