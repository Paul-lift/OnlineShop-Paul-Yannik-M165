"use client";

import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { getProducts } from "../../lib/api";
import { useShop } from "../../lib/ShopProvider";
import styles from "./shop.module.css";

export default function ShopPage() {
  const { products, loading, loadProducts } = useShop();
  const [allCategories, setAllCategories] = useState<string[]>(["Alle"]);
  const [activeCategory, setActiveCategory] = useState("Alle");

  useEffect(() => {
    void getProducts().then((all) => {
      const unique = Array.from(new Set(all.map((p) => p.category))).sort();
      setAllCategories(["Alle", ...unique]);
    });
    void loadProducts();
  }, [loadProducts]);

  async function handleCategoryChange(category: string) {
    setActiveCategory(category);
    await loadProducts(category);
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <p className={styles.kicker}>Online Shop</p>
          <h1 className={styles.title}>Produkte entdecken</h1>
          <p className={styles.subtitle}>
            Wähle eine Kategorie und stöbere durch die verfügbaren Produkte.
          </p>
        </div>

        <section className={styles.filters}>
          {allCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => void handleCategoryChange(category)}
              className={`${styles.filterButton} ${activeCategory === category ? styles.filterButtonActive : ""}`}
            >
              {category}
            </button>
          ))}
        </section>

        {loading ? (
          <div className={styles.messageBox}>Produkte werden geladen...</div>
        ) : products.length === 0 ? (
          <div className={styles.messageBox}>Keine Produkte gefunden.</div>
        ) : (
          <>
            <div className={styles.resultInfo}>
              {products.length} Produkt{products.length === 1 ? "" : "e"} gefunden
            </div>
            <div className={styles.grid}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
