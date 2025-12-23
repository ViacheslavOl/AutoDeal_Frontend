import styles from "./Footer.module.scss";
import logo from "../../assets/logoCar.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.line} />
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <img className={styles.logo} src={logo} alt="Logo" />
          </div>

          <nav className={styles.col} aria-label="Footer menu">
            <h4 className={styles.title}>Menu</h4>
            <ul className={styles.list}>
              <li>
                <a className={styles.link} href="#home">
                  Home
                </a>
              </li>
              <li>
                <a className={styles.link} href="#catalog">
                  Catalog
                </a>
              </li>
              <li>
                <a className={styles.link} href="#reviews">
                  Reviews
                </a>
              </li>
              <li>
                <a className={styles.link} href="#contacts">
                  Contacts
                </a>
              </li>
              <li>
                <a className={styles.link} href="#consultation">
                  Consultation
                </a>
              </li>
            </ul>
          </nav>

          <div className={styles.col}>
            <h4 className={styles.title}>Services</h4>
            <ul className={styles.list}>
              <li className={styles.item}>Expert Consultation</li>
              <li className={styles.item}>Get a free consultation</li>
              <li className={styles.item}>Car Selection</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.legal}>
            <a className={styles.link} href="#privacy">
              Privacy Policy
            </a>
            <span className={styles.dot}>•</span>
            <a className={styles.link} href="#terms">
              Terms & Conditions
            </a>
            <span className={styles.dot}>•</span>
            <a className={styles.link} href="#imprint">
              Imprint
            </a>
          </div>

          <div className={styles.copy}>© {new Date().getFullYear()} All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
