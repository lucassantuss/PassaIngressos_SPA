import styles from './FormContato.module.css';

export default function FormContato() {
    return (
        <div className={styles.contactFormContainer}>
            <h2>Entre em contato!!</h2>
            <form className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Nome completo</label>
                    <input type="text" id="name" placeholder="Digite o seu nome completo" />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="email@domain.com" />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="message">Mensagem</label>
                    <textarea id="message" placeholder="Digite a sua mensagem.." rows="9"></textarea>
                </div>

                <button type="submit" className={styles.submitButton}>Enviar</button>
            </form>
        </div>
    );
}