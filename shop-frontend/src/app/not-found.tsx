import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>404 – Seite nicht gefunden</h1>
      <p>Die angeforderte Seite existiert nicht.</p>
      <Link href="/onlineshop/shop">Zurück zum Shop</Link>
    </div>
  );
}
