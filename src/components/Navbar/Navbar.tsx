import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuthToken, isAuthenticated, subscribeAuthChange } from "../../utils/auth";
import styles from "./Navbar.module.scss";
import logo from "../../assets/logoCar.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => isAuthenticated());

  useEffect(() => {
    const unsubscribe = subscribeAuthChange(() => setIsLoggedIn(isAuthenticated()));
    return unsubscribe;
  }, []);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      clearAuthToken();
      navigate("/");
      return;
    }
    navigate("/auth");
  };

  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <img src={logo} alt="AutoDeal logo" />
        </div>
        <ul className={styles.menu}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/catalog">Catalog</a>
          </li>
          <li>
            <a href="/reviews">Reviews</a>
          </li>
          <li>
            <a href="/contacts">Contacts</a>
          </li>
          <li>
            <a href="/consultation">Consultation</a>
          </li>
        </ul>
        <button className={styles.car_finder} onClick={handleAuthClick}>
          {isLoggedIn ? "Exit" : "Sign in"}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
