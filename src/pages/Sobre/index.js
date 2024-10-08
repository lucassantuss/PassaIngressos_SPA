import FormContato from "components/FormContato";
import CampoTitulo from "components/CampoTitulo";

import styles from "./Sobre.module.css"

export default function Sobre() {
    return (
        <div className={styles.aboutContainer}>
            <div className="row">
                <div className={styles.textAboutContainer}>
                    <CampoTitulo titulo="Sobre"/>

                    <p>A Passa Ingressos é uma startup brasileira, com o intuito de facilitar a revenda e compra de ingressos para eventos por meio de uma plataforma que possa conectar as pessoas.</p>
                    <p>Na equipe de desenvolvimento do projeto e idealizadores da startup, temos:</p>
                    <ul>
                        <li>Danilo Rodrigues Dantas</li>
                        <li>Lucas Araujo dos Santos</li>
                        <li>Renan Cesar de Araujo</li>
                    </ul>
                    <p>Caso haja alguma dúvida, ou sugestão de melhoria para o software, fique a vontade para entrar em contato conosco!!</p>
                    <br />
                    
                    <FormContato />
                </div>                
            </div>

            <div className={styles.imageAboutContainer}>
                <div className={styles.imageAboutRow}>
                    <img src='/images/groupMembers/danilo.jpg' alt="Danilo Rodrigues Dantas" width="250px" height="250px" />
                    <img src='/images/groupMembers/renan.jpg' alt="Renan Cesar de Araujo" width="250px" height="250px" />
                </div>
                <div className={styles.imageAboutRow}>
                    <img src='/images/groupMembers/lucas.jpg' alt="Lucas Araujo dos Santos" width="250px" height="250px" />
                </div>
            </div>         
        </div>
    );
}