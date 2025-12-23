import styles from "./Hero.module.scss";
import stripe from "../../assets/orange-stripe.png";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Your <span className={styles.accent}>trusted partner </span>for
          <br />
          vehicle delivery from
          <br />
          Europe, the USA, and China
        </h1>
        <h2 className={styles.subtitle}>Get 5% off your first order!</h2>
        <div className={styles.button_container}>
          <button>Request a quote</button>
          <img src={stripe} alt="orange stripe for style" />
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.value}>11</span>
            <span className={styles.label}>
              Years of proven
              <br />
              experience
            </span>
          </div>

          <div className={styles.stat}>
            <span className={styles.value}>700+</span>
            <span className={styles.label}>
              Vehicles imported <br />
              annually
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
