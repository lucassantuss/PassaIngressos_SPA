import styles from "./InfoCard.module.css";

export default function InfoCard({ icon, title, text }) {
    return (
        <div className={styles.card}>
            <div className={styles.icon}>
                <img src={`/images/icons/${icon}.svg`} alt={title} />
            </div>
            
            <div>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.text}>{text}</p>
            </div>
        </div>
    );
}