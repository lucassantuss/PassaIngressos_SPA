import styles from './FormContato.module.css';

export default function FormContato() {
    return (
        <div className={styles.aboutContainer}>
            <div className={styles.textContainer}>
                <h1>Sobre</h1>
                <p>A Passa Ingressos é uma startup brasileira, com o intuito de facilitar a revenda e compra de ingressos para eventos por meio de uma plataforma que possa conectar as pessoas.</p>
                <p>Na equipe de desenvolvimento do projeto e idealizadores da startup, temos:</p>
                <ul>
                    <li>Danilo Rodrigues Dantas</li>
                    <li>Lucas Araujo dos Santos</li>
                    <li>Renan Cesar de Araujo</li>
                </ul>
                <p>Caso haja alguma dúvida, ou sugestão de melhoria para o software, fique à vontade para entrar em contato conosco!!</p>
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

            {/* <div className={styles.formContainer}> */}
                {/* <FormContato /> */}
            {/* </div> */}
        </div>
    );
}