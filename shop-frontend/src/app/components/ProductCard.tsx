import type { Product } from "../lib/mockData";
import styles from "./ProductCard.module.css";

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

const priceFormatter = new Intl.NumberFormat("de-CH", {
  style: "currency",
  currency: "CHF",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <div>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.category}>{product.category}</p>
        </div>
        <div className={styles.price}>
          {priceFormatter.format(product.price)}
        </div>
      </div>

      <div className={styles.details}>
        <p>
          <span className={styles.detailLabel}>Kategorie:</span> {product.category}
        </p>
        <p>
          <span className={styles.detailLabel}>Lager:</span>{" "}
          {product.stock === 0 ? "Nicht verfügbar" : `${product.stock} verfügbar`}
        </p>
        <div className={styles.tags}>
          {product.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onAddToCart(product)}
        className={styles.button}
      >
        In den Warenkorb
      </button>
    </article>
  );
}