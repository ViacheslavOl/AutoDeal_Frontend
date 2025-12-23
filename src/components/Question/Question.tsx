import styles from "./Question.module.scss";

const Question = () => {
  return (
    <section className={styles.question}>
      <div className={styles.container}>
        <h2 className={styles.title}>Have questions? Get a free consultation</h2>
        <h3 className={styles.subtitle}>Our manager will call you back and answer all your questions.</h3>
        <div className={styles.inputs}>
          <input className={styles.input} type="text" placeholder="Your name" />
          <input className={styles.input} type="text" placeholder="Phone number or Telegram" />

          <label className={styles.srOnly} htmlFor="consultant">
            Choose a consultant
          </label>
          <select id="consultant" className={styles.select} defaultValue="">
            <option value="" disabled>
              Choose a consultant
            </option>
            <option value="anna">Anna</option>
            <option value="mark">Mark</option>
            <option value="kate">Kate</option>
          </select>

          <label className={styles.srOnly} htmlFor="time">
            Choose a convenient time
          </label>
          <select id="time" className={styles.select} defaultValue="">
            <option value="" disabled>
              Choose a convenient time
            </option>
            <option value="09-11">09:00–11:00</option>
            <option value="11-13">11:00–13:00</option>
            <option value="14-16">14:00–16:00</option>
            <option value="16-18">16:00–18:00</option>
          </select>
        </div>
        <button className={styles.button}>Get a free consultation</button>
      </div>
    </section>
  );
};

export default Question;
