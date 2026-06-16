import type { Order, Product } from "./types";

const BASE = "http://localhost:8080";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, init);
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${path}`);
  return res.json() as Promise<T>;
}

export function getProducts(): Promise<Product[]> {
  return request<Product[]>("/products");
}

export function getProductById(id: string): Promise<Product> {
  return request<Product>(`/products/${id}`);
}

export function getProductsByCategory(category: string): Promise<Product[]> {
  return request<Product[]>(`/products/category/${encodeURIComponent(category)}`);
}

export function createProduct(product: Omit<Product, "id">): Promise<Product> {
  return request<Product>("/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
}

export function deleteProduct(id: string): Promise<void> {
  return request<void>(`/products/${id}`, { method: "DELETE" });
}

export function getOrders(): Promise<Order[]> {
  return request<Order[]>("/orders");
}

export function createOrder(order: {
  customerName: string;
  items: { productId: string; quantity: number; unitPrice: number }[];
}): Promise<Order> {
  return request<Order>("/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
}

export function getOrdersByCustomer(name: string): Promise<Order[]> {
  return request<Order[]>(`/orders/customer/${encodeURIComponent(name)}`);
}

export function getTopProducts(): Promise<unknown> {
  return request<unknown>("/stats/top-products");
}

export function getAvgPriceByCategory(): Promise<unknown> {
  return request<unknown>("/stats/avg-price-by-category");
}

export function getRevenueByCategory(): Promise<unknown> {
  return request<unknown>("/stats/revenue-by-category");
}

export function getRevenueByMonth(): Promise<unknown> {
  return request<unknown>("/stats/revenue-by-month");
}

export function getAvgOrderValue(): Promise<unknown> {
  return request<unknown>("/stats/avg-order-value");
}
