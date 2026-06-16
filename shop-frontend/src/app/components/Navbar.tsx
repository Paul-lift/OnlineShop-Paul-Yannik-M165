"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShop } from "../lib/ShopProvider";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/onlineshop/shop", label: "Shop" },
  { href: "/onlineshop/stats", label: "Statistiken" },
  { href: "/onlineshop/login", label: "Login" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const { cart } = useShop();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/onlineshop/shop" className={styles.logo}>
          Online Shop
        </Link>

        <div className={styles.links}>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.link} ${pathname === href ? styles.linkActive : ""}`}
            >
              {label}
            </Link>
          ))}

          <Link
            href="/onlineshop/warenkorb"
            className={`${styles.link} ${pathname === "/onlineshop/warenkorb" ? styles.linkActive : ""}`}
          >
            Warenkorb
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}
