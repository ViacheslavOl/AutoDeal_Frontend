import { useState } from "react";
import styles from "./AuthLayout.module.scss";

const AuthLayout = () => {
  const [mode, setMode] = useState("login");
  const isRegister = mode === "register";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className={styles.auth}>
      <div className={styles.container}>
        <h2 className={styles.title}>{isRegister ? "Create account" : "Sign in"}</h2>

        <form className={styles.inputs} onSubmit={handleSubmit}>
          {isRegister && <input className={styles.input} type="text" placeholder="Name" />}

          <input className={styles.input} type="email" placeholder="Email" />
          <input className={styles.input} type="password" placeholder="Password" />

          <button className={styles.button} type="submit">
            {isRegister ? "Sign up" : "Sign in"}
          </button>

          <p className={styles.switchText}>
            {isRegister ? (
              <>
                Already have an account?{" "}
                <button type="button" className={styles.switchBtn} onClick={() => setMode("login")}>
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <button type="button" className={styles.switchBtn} onClick={() => setMode("register")}>
                  Sign up
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </section>
  );
};

export default AuthLayout;
