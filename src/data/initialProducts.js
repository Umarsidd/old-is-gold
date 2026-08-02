export const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    name: "iPhone 15 Pro Max 256GB - Natural Titanium",
    brand: "Apple",
    category: "Smartphones",
    condition: "Like New", // Brand New, Like New, Refurbished, Good
    price: 79999,
    originalPrice: 159900,
    discountPercentage: 50,
    stock: 3,
    isSold: false,
    isHidden: false,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    description: "iPhone 15 Pro Max in Pristine Like New Condition. 96% Battery Health, 100% Genuine Parts Tested, 6 Months Store Warranty from OLD IS GOLD.",
    specs: {
      ram: "8GB",
      storage: "256GB",
      camera: "48MP + 12MP + 12MP",
      battery: "4422 mAh",
      display: "6.7 inch Super Retina XDR OLED 120Hz"
    }
  },
  {
    id: "prod-2",
    name: "Samsung Galaxy S24 Ultra 5G - Titanium Black",
    brand: "Samsung",
    category: "Smartphones",
    condition: "Like New",
    price: 74999,
    originalPrice: 129999,
    discountPercentage: 42,
    stock: 2,
    isSold: false,
    isHidden: false,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
    description: "Samsung Galaxy S24 Ultra with S-Pen, 200MP Quad Camera setup, Snapdragon 8 Gen 3 for Galaxy. Clean condition with bill and box.",
    specs: {
      ram: "12GB",
      storage: "256GB",
      camera: "200MP + 50MP + 12MP + 10MP",
      battery: "5000 mAh",
      display: "6.8 inch Dynamic AMOLED 2X 120Hz"
    }
  },
  {
    id: "prod-3",
    name: "OnePlus 12 5G - Silky Black (16GB RAM)",
    brand: "OnePlus",
    category: "Smartphones",
    condition: "Refurbished",
    price: 45999,
    originalPrice: 69999,
    discountPercentage: 34,
    stock: 5,
    isSold: false,
    isHidden: false,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80",
    description: "OnePlus 12 5G Hasselblad Camera system, 100W SuperVOOC Fast Charging, Snapdragon 8 Gen 3. Checked and verified by Umar Khan.",
    specs: {
      ram: "16GB",
      storage: "512GB",
      camera: "50MP + 64MP + 48MP",
      battery: "5400 mAh",
      display: "6.82 inch 2K 120Hz ProXDR"
    }
  },
  {
    id: "prod-4",
    name: "iPhone 13 128GB - Midnight Black",
    brand: "Apple",
    category: "Smartphones",
    condition: "Like New",
    price: 38999,
    originalPrice: 59900,
    discountPercentage: 35,
    stock: 4,
    isSold: false,
    isHidden: false,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    description: "iPhone 13 Midnight in flawless condition. A15 Bionic chip, Cinematic Mode, 91% battery capacity. Includes fast charger.",
    specs: {
      ram: "4GB",
      storage: "128GB",
      camera: "12MP Dual Camera",
      battery: "3240 mAh",
      display: "6.1 inch Super Retina XDR"
    }
  },
  {
    id: "prod-5",
    name: "Vintage Nokia 3310 Classic Re-issue",
    brand: "Nokia",
    category: "Feature Phones",
    condition: "Brand New",
    price: 2499,
    originalPrice: 3999,
    discountPercentage: 37,
    stock: 12,
    isSold: false,
    isHidden: false,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80",
    description: "Legendary Nokia 3310 with long battery life, Snake game, Dual SIM 4G connectivity. Pure nostalgia & ultimate durability.",
    specs: {
      ram: "64MB",
      storage: "128MB",
      camera: "2MP LED flash",
      battery: "1200 mAh (Standby up to 25 days)",
      display: "2.4 inch Curved Color Screen"
    }
  },
  {
    id: "prod-6",
    name: "Vivo X100 Pro 5G - Asteroid Black (Zeiss Camera)",
    brand: "Vivo",
    category: "Smartphones",
    condition: "Like New",
    price: 52999,
    originalPrice: 89999,
    discountPercentage: 41,
    stock: 2,
    isSold: false,
    isHidden: false,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    description: "Professional Zeiss Telephoto portrait camera, Dimensity 9300 powerhouse. Mint condition with invoice & 3 months store guarantee.",
    specs: {
      ram: "16GB",
      storage: "512GB",
      camera: "50MP Triple Zeiss APO Lens",
      battery: "5400 mAh",
      display: "6.78 inch AMOLED 120Hz"
    }
  },
  {
    id: "prod-7",
    name: "Xiaomi 14 Ultra 5G - White Leica Edition",
    brand: "Xiaomi",
    category: "Smartphones",
    condition: "Refurbished",
    price: 61999,
    originalPrice: 99999,
    discountPercentage: 38,
    stock: 1,
    isSold: false,
    isHidden: false,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80",
    description: "Leica Quad 50MP Cameras with 1-inch sensor, 90W fast charging. Tested and re-certified at OLD IS GOLD store.",
    specs: {
      ram: "16GB",
      storage: "512GB",
      camera: "50MP + 50MP + 50MP + 50MP Leica",
      battery: "5000 mAh",
      display: "6.73 inch LTPO AMOLED"
    }
  },
  {
    id: "prod-8",
    name: "iPhone 14 128GB - Starlight White",
    brand: "Apple",
    category: "Smartphones",
    condition: "Like New",
    price: 43999,
    originalPrice: 69900,
    discountPercentage: 37,
    stock: 3,
    isSold: false,
    isHidden: false,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
    description: "Apple iPhone 14 Starlight in pristine shape. Includes original charging cable and retail box.",
    specs: {
      ram: "6GB",
      storage: "128GB",
      camera: "12MP Dual Sensor",
      battery: "3279 mAh",
      display: "6.1 inch Super Retina XDR"
    }
  }
];

export const CATEGORIES = [
  "All",
  "Smartphones",
  "Feature Phones",
  "Refurbished Premium",
  "Budget Keypad",
  "Accessories"
];

export const BRANDS = [
  "All",
  "Apple",
  "Samsung",
  "OnePlus",
  "Nokia",
  "Vivo",
  "Xiaomi",
  "Realme"
];

export const CONDITIONS = [
  "All",
  "Brand New",
  "Like New",
  "Refurbished",
  "Good"
];
