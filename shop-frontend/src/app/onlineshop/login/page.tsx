"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useShop } from "../../lib/ShopProvider";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useShop();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login(name.trim());
    router.push("/onlineshop/shop");
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Anmelden</h1>
        <p className={styles.subtitle}>Melde dich an, um Bestellungen aufzugeben.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              placeholder="Max Mustermann"
              autoComplete="name"
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
              autoComplete="current-password"
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
