"use client";

import { useState } from "react";
import { useShop } from "../../lib/ShopProvider";
import styles from "./warenkorb.module.css";

const priceFormatter = new Intl.NumberFormat("de-CH", {
  style: "currency",
  currency: "CHF",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function WarenkorbPage() {
  const { cart, removeFromCart, checkout } = useShop();
  const [customerName, setCustomerName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  async function handleCheckout() {
    if (!customerName.trim()) {
      setErrorMsg("Bitte gib deinen Namen ein.");
      return;
    }
    setSubmitting(true);
    setErrorMsg("");
    try {
      await checkout(customerName.trim());
      setSuccessMsg("Bestellung erfolgreich aufgegeben!");
      setCustomerName("");
    } catch {
      setErrorMsg("Fehler beim Bestellen. Bitte versuche es erneut.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <p className={styles.kicker}>Online Shop</p>
          <h1 className={styles.title}>Warenkorb</h1>
        </div>

        {cart.length === 0 ? (
          <div className={styles.empty}>
            {successMsg ? successMsg : "Dein Warenkorb ist leer."}
          </div>
        ) : (
          <>
            <div className={styles.itemList}>
              {cart.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemQty}>× {item.quantity}</span>
                  </div>
                  <div className={styles.itemRight}>
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
              <div className={styles.total}>
                <span>Gesamt</span>
                <span>{priceFormatter.format(total)}</span>
              </div>

              <div className={styles.checkoutForm}>
                <input
                  type="text"
                  placeholder="Dein Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className={styles.input}
                />
                {errorMsg && <p className={styles.error}>{errorMsg}</p>}
                <button
                  type="button"
                  onClick={() => void handleCheckout()}
                  disabled={submitting}
                  className={styles.checkoutBtn}
                >
                  {submitting ? "Wird bestellt..." : "Jetzt bestellen"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
