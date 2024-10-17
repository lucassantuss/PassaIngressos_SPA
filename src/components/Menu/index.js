import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Menu.module.css";

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header>
      <nav className={styles.menu}>
        <div className={styles.menuLogo}>
          <Link to="/" className={styles.menuLink}>Passa Ingressos</Link>
        </div>
        <div className={styles.menuToggle}>
          <button className={styles.toggleButton} onClick={toggleMenu}>☰</button>
        </div>
        <ul className={`${styles.menuItens} ${menuOpen ? styles.active : ''}`}>
          <li>
            <Link to="/vender-ingresso" className={styles.menuLink} onClick={handleLinkClick}>Vender Ingresso</Link>
          </li>
          <li>
            <Link to="/eventos" className={styles.menuLink} onClick={handleLinkClick}>Eventos disponíveis</Link>
          </li>
          <li>
            <Link to="/como-funciona" className={styles.menuLink} onClick={handleLinkClick}>Como funciona</Link>
          </li>
          <li>
            <Link to="/sobre" className={styles.menuLink} onClick={handleLinkClick}>Sobre</Link>
          </li>
          {/* 
          <li>
            <Link to="/minha-conta" className={styles.menuLink} onClick={handleLinkClick}>Minha Conta</Link>
          </li>
          <li>
            <Link to="/logout" className={styles.menuLogin} onClick={handleLinkClick}>Logout</Link>
          </li> 
          */}
          <li>
            <Link to="/login" className={styles.menuLogin} onClick={handleLinkClick}>Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}