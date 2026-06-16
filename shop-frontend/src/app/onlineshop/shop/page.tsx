"use client";

import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useShop } from "../../lib/ShopProvider";
import styles from "./shop.module.css";

const categories = ["Alle", "Elektronik", "Kleidung", "Sport", "Haushalt"] as const;
type Category = (typeof categories)[number];

export default function ShopPage() {
  const { products, loading, loadProducts, addToCart } = useShop();
  const [activeCategory, setActiveCategory] = useState<Category>("Alle");

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  async function handleCategoryChange(category: Category) {
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
          {categories.map((category) => (
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
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
