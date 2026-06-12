export interface Product {
  id: string;
  name: string;
  category: string; // "Traditional Wear" | "Western Wear" | "Formal Wear" | "Night Wear" | "Sports Wear" | "Kids Wear" | "College Uniforms"
  subcategory: string; // Detailed: Sarees, Lehengas, Kurtas, T-Shirts, Blazers, school wear, custom stitching, etc.
  price: number; // Base price in INR (stored as double/number, e.g. 1499)
  discount: number; // Discount percentage (e.g., 20)
  rating: number;
  reviewsCount: number;
  image: string;
  gender: 'Men' | 'Women' | 'Kids' | 'Unisex';
  brand: string;
  sizes: string[];
  colors: string[];
  materials: string[];
  country: string;
  collegeName?: string; // present only for college uniforms
  isTrending?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  customStitching?: boolean;
  stitchingNotes?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  currency: string;
  status: 'Order Placed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
  trackingNumber: string;
}

export type LanguageCode =
  | 'en' | 'hi' | 'te' | 'ta' | 'kn' | 'ml' | 'bn' | 'mr' | 'pa' | 'gu'
  | 'ur' | 'ar' | 'fr' | 'de' | 'es' | 'zh' | 'ja' | 'ko' | 'ru';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  dir?: 'ltr' | 'rtl';
}

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AED' | 'SGD' | 'AUD' | 'CAD';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  rate: number; // Multiply INR base price by this rate
}
