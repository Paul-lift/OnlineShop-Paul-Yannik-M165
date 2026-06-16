"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShop } from "../lib/ShopProvider";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const { cart, customerName, logout } = useShop();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/onlineshop/shop" className={styles.logo}>
          <span className={styles.logoAccent}>M</span>165 Shop
        </Link>

        <div className={styles.links}>
          <Link
            href="/onlineshop/shop"
            className={`${styles.link} ${pathname === "/onlineshop/shop" ? styles.linkActive : ""}`}
          >
            Shop
          </Link>
          <Link
            href="/onlineshop/stats"
            className={`${styles.link} ${pathname === "/onlineshop/stats" ? styles.linkActive : ""}`}
          >
            Statistiken
          </Link>

          {customerName ? (
            <>
              <span className={styles.greeting}>Hallo, {customerName}</span>
              <button type="button" onClick={logout} className={styles.logoutBtn}>
                Abmelden
              </button>
            </>
          ) : (
            <Link
              href="/onlineshop/login"
              className={`${styles.link} ${pathname === "/onlineshop/login" ? styles.linkActive : ""}`}
            >
              Login
            </Link>
          )}

          <Link
            href="/onlineshop/warenkorb"
            className={`${styles.cartLink} ${pathname === "/onlineshop/warenkorb" ? styles.cartLinkActive : ""}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Warenkorb
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}
