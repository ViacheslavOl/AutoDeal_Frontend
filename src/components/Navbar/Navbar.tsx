import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuthToken, isAdmin, isAuthenticated, subscribeAuthChange } from "../../utils/auth";
import styles from "./Navbar.module.scss";
import logo from "../../assets/logoCar.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authState, setAuthState] = useState(() => ({ isLoggedIn: isAuthenticated(), isAdmin: isAdmin() }));

  useEffect(() => {
    const unsubscribe = subscribeAuthChange(() => setAuthState({ isLoggedIn: isAuthenticated(), isAdmin: isAdmin() }));
    return unsubscribe;
  }, []);

  const handleAuthClick = () => {
    setIsMenuOpen(false);
    if (authState.isLoggedIn) {
      clearAuthToken();
      navigate("/");
      return;
    }
    navigate("/auth");
  };

  return (
    <header>
      <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ""}`}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <img src={logo} alt="AutoDeal logo" />
          </div>
          <button type="button" className={styles.burger} aria-label="Toggle navigation menu" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((prev) => !prev)}>
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className={styles.menuWrapper}>
          <ul className={styles.menu}>
            <li>
              <a href="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="/catalog" onClick={() => setIsMenuOpen(false)}>
                Catalog
              </a>
            </li>
            <li>
              <a href="/reviews" onClick={() => setIsMenuOpen(false)}>
                Reviews
              </a>
            </li>
            <li>
              <a href="/contacts" onClick={() => setIsMenuOpen(false)}>
                Contacts
              </a>
            </li>
            <li>
              <a href="/consultation" onClick={() => setIsMenuOpen(false)}>
                Consultation
              </a>
            </li>
          </ul>
          <div className={styles.actions}>
            {authState.isLoggedIn && authState.isAdmin && (
              <button
                className={styles.car_finder}
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/admin");
                }}
              >
                Admin panel
              </button>
            )}
            <button className={styles.car_finder} onClick={handleAuthClick}>
              {authState.isLoggedIn ? "Exit" : "Sign in"}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
