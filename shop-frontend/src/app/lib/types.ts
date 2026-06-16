export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  tags: string[];
}

export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  customerName: string;
  orderDate: string;
  status: string;
  items: OrderItem[];
}

export interface CartItem extends Product {
  quantity: number;
}
