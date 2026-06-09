export interface Product {
  id: string;
  name: string;
  price: number;
  category: "Elektronik" | "Kleidung" | "Sport" | "Haushalt";
  stock: number;
  tags: string[];
}

export const mockProducts: Product[] = [
  {
    id: "prod-1",
    name: "Smartphone Nova X",
    price: 799,
    category: "Elektronik",
    stock: 24,
    tags: ["smartphone", "5g", "display"],
  },
  {
    id: "prod-2",
    name: "Laptop Pro 14",
    price: 1499,
    category: "Elektronik",
    stock: 12,
    tags: ["laptop", "arbeit", "premium"],
  },
  {
    id: "prod-3",
    name: "Bluetooth Kopfhörer AirBeat",
    price: 129,
    category: "Elektronik",
    stock: 40,
    tags: ["audio", "wireless", "musik"],
  },
  {
    id: "prod-4",
    name: "Smartwatch Pulse",
    price: 219,
    category: "Elektronik",
    stock: 18,
    tags: ["wearable", "fitness", "bluetooth"],
  },
  {
    id: "prod-5",
    name: "T-Shirt Basic Cotton",
    price: 24.9,
    category: "Kleidung",
    stock: 80,
    tags: ["shirt", "cotton", "casual"],
  },
  {
    id: "prod-6",
    name: "Jeans Slim Fit",
    price: 69.9,
    category: "Kleidung",
    stock: 45,
    tags: ["jeans", "denim", "mode"],
  },
  {
    id: "prod-7",
    name: "Hoodie Urban Warm",
    price: 54.9,
    category: "Kleidung",
    stock: 35,
    tags: ["hoodie", "streetwear", "warm"],
  },
  {
    id: "prod-8",
    name: "Wanderschuhe Trail Grip",
    price: 119,
    category: "Sport",
    stock: 22,
    tags: ["hiking", "outdoor", "shoes"],
  },
  {
    id: "prod-9",
    name: "Yoga Matte Flex",
    price: 34.9,
    category: "Sport",
    stock: 60,
    tags: ["fitness", "yoga", "home"],
  },
  {
    id: "prod-10",
    name: "Fußball Classic",
    price: 29.9,
    category: "Sport",
    stock: 50,
    tags: ["ball", "team", "outdoor"],
  },
  {
    id: "prod-11",
    name: "Staubsauger CleanMax",
    price: 159,
    category: "Haushalt",
    stock: 16,
    tags: ["cleaning", "vacuum", "home"],
  },
  {
    id: "prod-12",
    name: "Kaffeemaschine Barista One",
    price: 249,
    category: "Haushalt",
    stock: 14,
    tags: ["kitchen", "coffee", "appliance"],
  },
  {
    id: "prod-13",
    name: "LED Lampe Warm Light",
    price: 19.9,
    category: "Haushalt",
    stock: 90,
    tags: ["lighting", "energy-saving", "home"],
  },
  {
    id: "prod-14",
    name: "Backblech Set Deluxe",
    price: 39.9,
    category: "Haushalt",
    stock: 33,
    tags: ["kitchen", "baking", "accessory"],
  },
  {
    id: "prod-15",
    name: "Powerbank 20K",
    price: 49.9,
    category: "Elektronik",
    stock: 55,
    tags: ["mobile", "charging", "travel"],
  },
];