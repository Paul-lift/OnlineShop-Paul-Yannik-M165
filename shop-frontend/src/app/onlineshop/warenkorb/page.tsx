"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useShop } from "../../lib/ShopProvider";
import styles from "./warenkorb.module.css";

const priceFormatter = new Intl.NumberFormat("de-CH", {
  style: "currency",
  currency: "CHF",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function WarenkorbPage() {
  const router = useRouter();
  const { cart, removeFromCart, checkout, customerName } = useShop();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  async function handleCheckout() {
    setSubmitting(true);
    setErrorMsg("");
    try {
      await checkout();
      router.push("/onlineshop/shop");
    } catch {
      setErrorMsg("Fehler beim Bestellen. Bitte versuche es erneut.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Warenkorb</h1>
        </div>

        {cart.length === 0 ? (
          <div className={styles.empty}>
            <p>Dein Warenkorb ist leer.</p>
            <Link href="/onlineshop/shop" className={styles.backLink}>
              Weiter einkaufen
            </Link>
          </div>
        ) : (
          <div className={styles.layout}>
            <div className={styles.itemList}>
              {cart.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.itemMeta}>
                    <span className={styles.itemCategory}>{item.category}</span>
                    <span className={styles.itemName}>{item.name}</span>
                  </div>
                  <div className={styles.itemRight}>
                    <span className={styles.itemQty}>× {item.quantity}</span>
                    <span className={styles.itemPrice}>
                      {priceFormatter.format(item.price * item.quantity)}
                    </span>
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => removeFromCart(item.id)}
                    >
                      Entfernen
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.summary}>
              <div className={styles.summaryRow}>
                <span>Artikel ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                <span>{priceFormatter.format(total)}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Gesamtbetrag</span>
                <span>{priceFormatter.format(total)}</span>
              </div>

              {customerName ? (
                <>
                  <p className={styles.orderAs}>Bestellen als: <strong>{customerName}</strong></p>
                  {errorMsg && <p className={styles.error}>{errorMsg}</p>}
                  <button
                    type="button"
                    onClick={() => void handleCheckout()}
                    disabled={submitting}
                    className={styles.checkoutBtn}
                  >
                    {submitting ? "Wird bestellt…" : "Jetzt bestellen"}
                  </button>
                </>
              ) : (
                <div className={styles.loginPrompt}>
                  <p>Bitte melde dich an, um zu bestellen.</p>
                  <Link href="/onlineshop/login" className={styles.loginLink}>
                    Zum Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
