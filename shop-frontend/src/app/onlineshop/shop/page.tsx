"use client";

import { useEffect, useState } from "react";

import ProductCard from "../../components/ProductCard";
import { getProducts, getProductsByCategory } from "../../lib/api";
import type { Product } from "../../lib/mockData";
import styles from "./shop.module.css";

const categories = ["Alle", "Elektronik", "Kleidung", "Sport", "Haushalt"] as const;

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("Alle");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void loadProducts("Alle");
  }, []);

  async function loadProducts(category: (typeof categories)[number]) {
    setLoading(true);
    setActiveCategory(category);

    try {
      const data = category === "Alle" ? await getProducts() : await getProductsByCategory(category);
      setProducts(data);
    } finally {
      setLoading(false);
    }
  }

  function handleAddToCart(product: Product) {
    console.log(product);
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <p className={styles.kicker}>Online Shop</p>
          <h1 className={styles.title}>Produkte entdecken</h1>
          <p className={styles.subtitle}>
            Wähle eine Kategorie und stöbere durch die verfügbaren Produkte aus der Mock-Datenquelle.
          </p>
        </div>

        <section className={styles.filters}>
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => void loadProducts(category)}
                className={`${styles.filterButton} ${isActive ? styles.filterButtonActive : ""}`}
              >
                {category}
              </button>
            );
          })}
        </section>

        {loading ? (
          <div className={styles.messageBox}>
            Produkte werden geladen...
          </div>
        ) : products.length === 0 ? (
          <div className={styles.messageBox}>
            Keine Produkte gefunden.
          </div>
        ) : (
          <>
            <div className={styles.resultInfo}>
              {products.length} Produkt{products.length === 1 ? "" : "e"} gefunden
            </div>

            <div className={styles.grid}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}