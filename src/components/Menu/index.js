import { Link } from "react-router-dom";

import styles from "./Menu.module.css";

export default function Menu() {
  return (
    <header>
      <nav className={styles.menu}>
        <ul>
          <li className={styles.menuLogo}>
            <Link to="/" className={styles.menuLink}>Passa Ingressos</Link>
          </li>

          <li className={styles.menuItens}>
            <Link to="/vender-ingresso" className={styles.menuLink}>Vender Ingresso</Link>
            <Link to="/eventos" className={styles.menuLink}>Eventos disponíveis</Link>
            <Link to="/como-funciona" className={styles.menuLink}>Como funciona</Link>
            <Link to="/sobre" className={styles.menuLink}>Sobre</Link>
            <Link to="/login" className={styles.menuLogin}>Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}