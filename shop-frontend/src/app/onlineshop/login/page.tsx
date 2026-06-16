"use client";

import { useState } from "react";
import styles from "./login.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert(`Login als ${email} (Demo — kein echtes Auth)`);
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <p className={styles.kicker}>Online Shop</p>
        <h1 className={styles.title}>Anmelden</h1>
        <p className={styles.subtitle}>Melde dich an, um fortzufahren.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              E-Mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="name@beispiel.ch"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Passwort
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className={styles.button}>
            Anmelden
          </button>
        </form>
      </div>
    </main>
  );
}
