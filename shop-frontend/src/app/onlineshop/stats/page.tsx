"use client";

import { useEffect, useState } from "react";
import {
  getAvgOrderValue,
  getAvgPriceByCategory,
  getRevenueByCategory,
  getRevenueByMonth,
  getTopProducts,
} from "../../lib/api";
import styles from "./stats.module.css";

const priceFormatter = new Intl.NumberFormat("de-CH", {
  style: "currency",
  currency: "CHF",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat("de-CH");

function isCurrencyKey(key?: string): boolean {
  if (!key) return true;
  return /(price|preis|revenue|umsatz|value|wert|total(?!quantity))/i.test(key);
}

function formatCell(value: unknown, key?: string): string {
  if (typeof value === "number") {
    return isCurrencyKey(key)
      ? priceFormatter.format(value)
      : numberFormatter.format(value);
  }
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

function StatBlock({ data }: { data: unknown }) {
  if (data === null) {
    return <p className={styles.loading}>Laden…</p>;
  }

  if (typeof data === "number") {
    return <p className={styles.singleValue}>{priceFormatter.format(data)}</p>;
  }

  if (Array.isArray(data)) {
    if (data.length === 0) return <p className={styles.empty}>Keine Daten</p>;
    const keys = Object.keys(data[0] as Record<string, unknown>);
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            {keys.map((k) => (
              <th key={k}>{k}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(data as Record<string, unknown>[]).map((row, i) => (
            <tr key={i}>
              {keys.map((k) => (
                <td key={k}>{formatCell(row[k], k)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (typeof data === "object" && data !== null) {
    const entries = Object.entries(data as Record<string, unknown>);
    if (entries.length === 0)
      return <p className={styles.empty}>Keine Daten</p>;
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Kategorie</th>
            <th>Wert</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([key, val]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{formatCell(val)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return <p className={styles.singleValue}>{String(data)}</p>;
}

export default function StatsPage() {
  const [topProducts, setTopProducts] = useState<unknown>(null);
  const [avgPriceByCategory, setAvgPriceByCategory] = useState<unknown>(null);
  const [revenueByCategory, setRevenueByCategory] = useState<unknown>(null);
  const [revenueByMonth, setRevenueByMonth] = useState<unknown>(null);
  const [avgOrderValue, setAvgOrderValue] = useState<unknown>(null);

  useEffect(() => {
    void getTopProducts()
      .then(setTopProducts)
      .catch(() => setTopProducts([]));
    void getAvgPriceByCategory()
      .then(setAvgPriceByCategory)
      .catch(() => setAvgPriceByCategory({}));
    void getRevenueByCategory()
      .then(setRevenueByCategory)
      .catch(() => setRevenueByCategory({}));
    void getRevenueByMonth()
      .then(setRevenueByMonth)
      .catch(() => setRevenueByMonth([]));
    void getAvgOrderValue()
      .then(setAvgOrderValue)
      .catch(() => setAvgOrderValue(0));
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <p className={styles.kicker}>Online Shop</p>
          <h1 className={styles.title}>Statistiken</h1>
          <p className={styles.subtitle}>
            Übersicht über Verkäufe, Umsätze und Bestellungen.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Top-Produkte</h2>
            <StatBlock data={topProducts} />
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Ø Preis pro Kategorie</h2>
            <StatBlock data={avgPriceByCategory} />
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Umsatz pro Kategorie</h2>
            <StatBlock data={revenueByCategory} />
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Umsatz pro Monat</h2>
            <StatBlock data={revenueByMonth} />
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Ø Bestellwert</h2>
            <StatBlock data={avgOrderValue} />
          </div>
        </div>
      </div>
    </main>
  );
}
