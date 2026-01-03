import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.scss";
import logo from "../../assets/logoCar.png";

const Navbar = () => {
  const navigate = useNavigate();
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
        <button className={styles.car_finder} onClick={() => navigate("/auth")}>
          Sign in
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
