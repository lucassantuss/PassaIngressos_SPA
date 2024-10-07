import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from "react-router-dom";

import styles from "./Rodape.module.css"

export default function Menu() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.right}>
                    <Link to="/" className={styles.brandName}>Passa Ingressos</Link>
                    <div className={styles.icons}>
                        <FaFacebookF className={styles.icon} />
                        <FaInstagram className={styles.icon} />
                        <FaYoutube className={styles.icon} />
                    </div>
                </div>

                <div className={styles.left}>
                    <div className={styles.links}>
                        <Link to="/vender-ingresso" className={styles.link}>Vender ingresso</Link>
                        <Link to="/eventos" className={styles.link}>Eventos disponíveis</Link>
                        <Link to="/como-funciona" className={styles.link}>Como funciona</Link>
                        <Link to="/sobre" className={styles.link}>Sobre</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};