import styles from "./Advantage.module.scss";
import { ADVANTAGES } from "../../data/advantages";

const Advantage = () => {
  return (
    <section className={styles.advantage}>
      <div className={styles.line}></div>
      <div className={styles.container}>
        <h2 className={styles.title}>Our Advantages</h2>
        <div className={styles.grid}>
          {ADVANTAGES.map((item) => (
            <article key={item.id} className={styles.card}>
              <span className={styles.badge}>{item.id}</span>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantage;
