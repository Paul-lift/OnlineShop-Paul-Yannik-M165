"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { CartItem, Product } from "./types";
import { createOrder, getProducts, getProductsByCategory } from "./api";

interface ShopContextValue {
  products: Product[];
  cart: CartItem[];
  loading: boolean;
  customerName: string;
  login: (name: string) => void;
  logout: () => void;
  loadProducts: (category?: string) => Promise<void>;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  checkout: () => Promise<void>;
}

const ShopContext = createContext<ShopContextValue | null>(null);

export function useShop(): ShopContextValue {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const login = useCallback((name: string) => {
    setCustomerName(name);
  }, []);

  const logout = useCallback(() => {
    setCustomerName("");
    setCart([]);
  }, []);

  const loadProducts = useCallback(async (category?: string) => {
    setLoading(true);
    try {
      const data =
        category && category !== "Alle"
          ? await getProductsByCategory(category)
          : await getProducts();
      setProducts(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== productId));
  }, []);

  const checkout = useCallback(async () => {
    if (!customerName) throw new Error("Nicht eingeloggt");
    await createOrder({
      customerName,
      items: cart.map((i) => ({
        productId: i.id,
        quantity: i.quantity,
        unitPrice: i.price,
      })),
    });
    setCart([]);
  }, [cart, customerName]);

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        loading,
        customerName,
        login,
        logout,
        loadProducts,
        addToCart,
        removeFromCart,
        checkout,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}
