"use client";

import type { Product } from "../lib/types";
import { useShop } from "../lib/ShopProvider";
import styles from "./ProductCard.module.css";

const priceFormatter = new Intl.NumberFormat("de-CH", {
  style: "currency",
  currency: "CHF",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useShop();

  return (
    <article className={styles.card}>
      <div className={styles.meta}>
        <span className={styles.category}>{product.category}</span>
        <span className={product.stock === 0 ? styles.stockOut : styles.stockIn}>
          {product.stock === 0 ? "Ausverkauft" : `${product.stock} auf Lager`}
        </span>
      </div>

      <h3 className={styles.name}>{product.name}</h3>

      <div className={styles.footer}>
        <span className={styles.price}>{priceFormatter.format(product.price)}</span>
        <button
          type="button"
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          className={styles.button}
        >
          In den Warenkorb
        </button>
      </div>
    </article>
  );
}
