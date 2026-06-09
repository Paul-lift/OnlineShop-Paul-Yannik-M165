import { mockProducts, type Product } from "./mockData";

export async function getProducts(): Promise<Product[]> {
  return mockProducts;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return mockProducts.find((product) => product.id === id);
}

export async function getProductsByCategory(category: Product["category"]): Promise<Product[]> {
  return mockProducts.filter((product) => product.category === category);
}