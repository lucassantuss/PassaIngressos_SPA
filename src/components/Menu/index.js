import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import styles from "./Menu.module.css";

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Estado para controlar o logout
  const { userLogged, signOut } = useAuth(); 
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    signOut();
    setMenuOpen(false);
    setIsLoggingOut(true); // Marca que o usuário está em processo de logout
  };

  useEffect(() => {
    if (isLoggingOut) {
      navigate("/"); // Redireciona para a tela inicial
      setIsLoggingOut(false); // Reseta o estado após o redirecionamento
    }
  }, [isLoggingOut, navigate]);

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
          {userLogged() ? (
            <>
              <li>
                <Link to="/minha-conta" className={styles.menuLink} onClick={handleLinkClick}>Minha Conta</Link>
              </li>
              <li>
                <button className={styles.menuLogin} onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className={styles.menuLogin} onClick={handleLinkClick}>Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}