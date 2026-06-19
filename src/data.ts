import { Product, Language, Currency } from './types';

// Import local product images for robust compile-time compilation & production asset serving
import imgRoyalLehenga from './assets/images/royal_lehenga_1781246813481.jpg';
import imgSchoolPolo from './assets/images/school_polo_1781246799728.jpg';
import imgActiveTrackPants from './assets/images/active_track_pants_1781246998656.jpg';
import imgIitFormal from './assets/images/iit_uniform_formal_1781246212053.jpg';
import imgIitSummer from './assets/images/iit_uniform_summer_1781246227478.jpg';
import imgIitWomen from './assets/images/iit_uniform_women_1781246241994.jpg';
import imgIitProduct from './assets/images/iit_uniform_product_1781246255292.jpg';


export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', dir: 'rtl' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' }
];

export const CURRENCIES: Currency[] = [
  { code: 'INR', symbol: '₹', rate: 1.0 },
  { code: 'USD', symbol: '$', rate: 0.012 },
  { code: 'EUR', symbol: '€', rate: 0.011 },
  { code: 'GBP', symbol: '£', rate: 0.0094 },
  { code: 'JPY', symbol: '¥', rate: 1.85 },
  { code: 'AED', symbol: 'AED ', rate: 0.044 },
  { code: 'SGD', symbol: 'S$', rate: 0.016 },
  { code: 'AUD', symbol: 'A$', rate: 0.018 },
  { code: 'CAD', symbol: 'C$', rate: 0.016 }
];

const STATIC_PRODUCTS: Product[] = [
  // --- TRADITIONAL WEAR ---
  {
    id: 'trad-1',
    name: 'Kanchipuram Brocade Rich Saree',
    category: 'Traditional Wear',
    subcategory: 'Sarees',
    price: 4999,
    discount: 15,
    rating: 4.8,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    gender: 'Women',
    brand: 'ReVa Heritage',
    sizes: ['Free Size'],
    colors: ['Deep Red', 'Golden Mustard', 'Emerald Green'],
    materials: ['Kanchipuram Pure Silk'],
    country: 'India',
    isTrending: true
  },
  {
    id: 'trad-2',
    name: 'Vrindavan Royal Bridal Lehenga',
    category: 'Traditional Wear',
    subcategory: 'Lehengas',
    price: 12999,
    discount: 20,
    rating: 4.9,
    reviewsCount: 88,
    image: imgRoyalLehenga,
    gender: 'Women',
    brand: 'ReVa Royal',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Maroon Red', 'Midnight Navy', 'Blush Pink'],
    materials: ['Velvet', 'Organza Duppata'],
    country: 'India',
    isTrending: true
  },
  {
    id: 'trad-3',
    name: 'Jaipur Cotton Printed Kurta Set',
    category: 'Traditional Wear',
    subcategory: 'Kurtas',
    price: 1899,
    discount: 10,
    rating: 4.5,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    gender: 'Women',
    brand: 'Jaipur weaves',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Indigo Blue', 'Turmeric Yellow', 'Ruby Red'],
    materials: ['100% Organic Handblock Cotton'],
    country: 'India'
  },
  {
    id: 'trad-4',
    name: 'Embroidered Silk Sherwani Set',
    category: 'Traditional Wear',
    subcategory: 'Sherwanis',
    price: 8499,
    discount: 25,
    rating: 4.7,
    reviewsCount: 65,
    image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=600&q=80',
    gender: 'Men',
    brand: 'ReVa Groom',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Off-White', 'Royal Gold', 'Ruby Velvet'],
    materials: ['Art Silk', 'Jacquard'],
    country: 'India',
    isTrending: true
  },

  // --- WESTERN WEAR ---
  {
    id: 'west-1',
    name: 'Cosmic Graphic Oversized Tee',
    category: 'Western Wear',
    subcategory: 'T-Shirts',
    price: 1199,
    discount: 30,
    rating: 4.6,
    reviewsCount: 421,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    gender: 'Unisex',
    brand: 'ReVa Cyber',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Midnight Black', 'Acid Wash Grey', 'Neon Blue'],
    materials: ['Pre-shrunk Combed Cotton'],
    country: 'USA'
  },
  {
    id: 'west-2',
    name: 'Urban Streetwear Denim Jacket',
    category: 'Western Wear',
    subcategory: 'Jackets',
    price: 2999,
    discount: 40,
    rating: 4.4,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80',
    gender: 'Men',
    brand: 'Denim Lab',
    sizes: ['M', 'L', 'XL'],
    colors: ['Stone Wash Blue', 'Deep Indigo', 'Pitch Black'],
    materials: ['Heavyweight 14oz Denim'],
    country: 'USA',
    isTrending: true
  },
  {
    id: 'west-3',
    name: 'Slim Fit Heavy Selvedge Jeans',
    category: 'Western Wear',
    subcategory: 'Jeans',
    price: 2499,
    discount: 15,
    rating: 4.7,
    reviewsCount: 305,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80',
    gender: 'Men',
    brand: 'ReVa Denim',
    sizes: ['30', '32', '34', '36'],
    colors: ['Raw Indigo', 'Classic Blue', 'Asphalt Charcoal'],
    materials: ['Japanese Selvedge Denim'],
    country: 'Japan'
  },
  {
    id: 'west-4',
    name: 'Retro fleece Winter Hoodie',
    category: 'Western Wear',
    subcategory: 'Hoodies',
    price: 2199,
    discount: 25,
    rating: 4.8,
    reviewsCount: 512,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80',
    gender: 'Unisex',
    brand: 'ReVa Sport',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Desert Tan', 'Forest Green', 'Heather Grey', 'Charcoal'],
    materials: ['Polyester Fleece Blended Cotton'],
    country: 'Canada'
  },
  {
    id: 'west-5',
    name: 'Retro Bohemian Midi Dress',
    category: 'Western Wear',
    subcategory: 'Dresses',
    price: 1999,
    discount: 20,
    rating: 4.5,
    reviewsCount: 118,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
    gender: 'Women',
    brand: 'Boho Vibe',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Floral Rusty Red', 'Olive Green', 'Classic Cream'],
    materials: ['Rayon Georgette'],
    country: 'Spain'
  },

  // --- FORMAL WEAR ---
  {
    id: 'form-1',
    name: 'Savile Row Charcoal Business Suit',
    category: 'Formal Wear',
    subcategory: 'Suits',
    price: 11499,
    discount: 30,
    rating: 4.9,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80',
    gender: 'Men',
    brand: 'Savile Club',
    sizes: ['38R', '40R', '42R', '44R'],
    colors: ['Charcoal Grey', 'Deep Navy Blue', 'Executive Black'],
    materials: ['Merino Wool Blend'],
    country: 'UK',
    isTrending: true
  },
  {
    id: 'form-2',
    name: 'Premium Giza Cotton Formal Shirt',
    category: 'Formal Wear',
    subcategory: 'Formal Shirts',
    price: 1799,
    discount: 10,
    rating: 4.6,
    reviewsCount: 198,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    gender: 'Men',
    brand: 'ReVa Corporate',
    sizes: ['39', '40', '42', '44'],
    colors: ['Crisp White', 'Ice Blue', 'Soft Lavender'],
    materials: ['100% Egyptian Giza Cotton'],
    country: 'Egypt'
  },
  {
    id: 'form-3',
    name: 'Avenue Premium Custom Blazer',
    category: 'Formal Wear',
    subcategory: 'Blazers',
    price: 4599,
    discount: 20,
    rating: 4.7,
    reviewsCount: 114,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    gender: 'Men',
    brand: 'ReVa Class',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Bordeaux Red', 'Royal Blue', 'Sandy Beige'],
    materials: ['Linen and Tweed'],
    country: 'France'
  },

  // --- NIGHT WEAR ---
  {
    id: 'night-1',
    name: 'CloudSatin Luxury Sleepwear Pajamas',
    category: 'Night Wear',
    subcategory: 'Pajamas',
    price: 1699,
    discount: 15,
    rating: 4.8,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1608096299210-db7e38487075?auto=format&fit=crop&w=600&q=80',
    gender: 'Women',
    brand: 'Snooze Haven',
    sizes: ['S', 'M', 'L'],
    colors: ['Navy Blue', 'Wine Red', 'Emerald Green'],
    materials: ['Mulberry Satin Silk'],
    country: 'Italy'
  },

  // --- SPORTS WEAR ---
  {
    id: 'sport-1',
    name: 'Aerofit Active Track Pants',
    category: 'Sports Wear',
    subcategory: 'Track Pants',
    price: 1399,
    discount: 25,
    rating: 4.4,
    reviewsCount: 156,
    image: imgActiveTrackPants,
    gender: 'Unisex',
    brand: 'ReVa Run',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Asphalt Charcoal', 'Stealth Black', 'Navy'],
    materials: ['Polyester Elastane Sport Blend'],
    country: 'USA'
  },

  // --- KIDS WEAR ---
  {
    id: 'kids-1',
    name: 'Smart School Academy Polo',
    category: 'Kids Wear',
    subcategory: 'School Wear',
    price: 799,
    discount: 15,
    rating: 4.5,
    reviewsCount: 78,
    image: imgSchoolPolo,
    gender: 'Kids',
    brand: 'ReVa Uniforms',
    sizes: ['6 Years', '8 Years', '10 Years', '12 Years'],
    colors: ['White', 'Sky Blue', 'Cream'],
    materials: ['Pique Knit Cotton-Poly Blend'],
    country: 'India'
  },

  // --- GLOBAL COLLEGE UNIFORMS SECTION ---
  {
    id: 'uni-1',
    name: 'Vignan University Elegant Officer Blazer Set',
    category: 'College Uniforms',
    subcategory: 'Blazers',
    price: 3499,
    discount: 15,
    rating: 4.7,
    reviewsCount: 230,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    gender: 'Unisex',
    brand: 'ReVa Academy',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Midnight Blue', 'Steel Grey'],
    materials: ['Viscose Poly Tweed'],
    country: 'India',
    collegeName: 'Vignan University'
  },
  {
    id: 'uni-2',
    name: 'GVP Gayatri Vidya Parishad White Kurta/Shirt & Pants Set',
    category: 'College Uniforms',
    subcategory: 'Ethnic Wear',
    price: 1499,
    discount: 10,
    rating: 4.5,
    reviewsCount: 180,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    gender: 'Unisex',
    brand: 'ReVa Academy',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Spun Pure White'],
    materials: ['Mercerized Khadi Cotton'],
    country: 'India',
    collegeName: 'Gayatri Vidya Parishad'
  },
  {
    id: 'uni-3',
    name: 'Raghu Engineering College Corporate Pin-Striped Set',
    category: 'College Uniforms',
    subcategory: 'Business Wear',
    price: 1899,
    discount: 20,
    rating: 4.6,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    gender: 'Unisex',
    brand: 'ReVa Academy',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Classic Light Blue / Navy Stripes'],
    materials: ['Classic Poplin Blend'],
    country: 'India',
    collegeName: 'Raghu Engineering College'
  },
  {
    id: 'uni-4a',
    name: 'IIT-inspired Academic Uniform (Formal Blazer Setup)',
    category: 'College Uniforms',
    subcategory: 'Blazers',
    price: 3499,
    discount: 15,
    rating: 4.9,
    reviewsCount: 540,
    image: imgIitFormal,
    gender: 'Men',
    brand: 'ReVa Collegiate',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy Blue Blazer, Crimson Accent, Charcoal Trousers'],
    materials: ['Premium Viscose Poly Tweed, Egyptian Giza Cotton'],
    country: 'India',
    collegeName: 'IITs',
    isTrending: true
  },
  {
    id: 'uni-4b',
    name: 'IIT-inspired Academic Uniform (Summer Model)',
    category: 'College Uniforms',
    subcategory: 'Formal Shirts',
    price: 1899,
    discount: 10,
    rating: 4.8,
    reviewsCount: 312,
    image: imgIitSummer,
    gender: 'Men',
    brand: 'ReVa Collegiate',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Crisp Light Blue, Charcoal Grey Trousers'],
    materials: ['100% Cotton Poplin, Combed Yarn'],
    country: 'India',
    collegeName: 'IITs'
  },
  {
    id: 'uni-4c',
    name: 'IIT-inspired Academic Uniform (Women Blazer & Skirt/Trousers)',
    category: 'College Uniforms',
    subcategory: 'Suits',
    price: 3299,
    discount: 12,
    rating: 4.9,
    reviewsCount: 228,
    image: imgIitWomen,
    gender: 'Women',
    brand: 'ReVa Collegiate',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy Blue Blazer, White Shirt, Pleated Skirt/Trousers'],
    materials: ['Premium Twill Wool Blend, Linette Polyester'],
    country: 'India',
    collegeName: 'IITs',
    isTrending: true
  },
  {
    id: 'uni-4d',
    name: 'IIT-inspired Academic Uniform (Multi-Angle Presentation Set)',
    category: 'College Uniforms',
    subcategory: 'Suits',
    price: 4199,
    discount: 20,
    rating: 4.9,
    reviewsCount: 184,
    image: imgIitProduct,
    gender: 'Unisex',
    brand: 'ReVa Collegiate',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Complete Combo Pack (Front, Side, Back, Fabric Sample)'],
    materials: ['Standard Institutional Grade Tweed/Cotton'],
    country: 'India',
    collegeName: 'IITs'
  },
  {
    id: 'uni-5',
    name: 'NIT National Academic Blazer Uniform',
    category: 'College Uniforms',
    subcategory: 'Suits',
    price: 3299,
    discount: 10,
    rating: 4.8,
    reviewsCount: 405,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80',
    gender: 'Unisex',
    brand: 'ReVa Academy',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Oxford Graphite'],
    materials: ['Tweed Wollon-blend'],
    country: 'India',
    collegeName: 'NITs'
  },
  {
    id: 'uni-6',
    name: 'MIT Crimson Ivy League Premium Blazer',
    category: 'College Uniforms',
    subcategory: 'Blazers',
    price: 8299,
    discount: 20,
    rating: 4.9,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    gender: 'Unisex',
    brand: 'MIT official',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Crimson Red', 'Harvard White'],
    materials: ['Luxury Wool Blend'],
    country: 'USA',
    collegeName: 'Universities in USA'
  },
  {
    id: 'uni-7',
    name: 'Oxford Academic Navy Blazer & Vest Set',
    category: 'College Uniforms',
    subcategory: 'Suits',
    price: 9499,
    discount: 25,
    rating: 4.9,
    reviewsCount: 150,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80',
    gender: 'Unisex',
    brand: 'Oxford Tweed',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Deep Royal Oxford Navy'],
    materials: ['100% British Merino wool'],
    country: 'UK',
    collegeName: 'Universities in UK'
  },
  {
    id: 'uni-8',
    name: 'UniMelb Crested Academic Varsity Wool Jacket',
    category: 'College Uniforms',
    subcategory: 'Jackets',
    price: 4599,
    discount: 15,
    rating: 4.8,
    reviewsCount: 168,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80',
    gender: 'Unisex',
    brand: 'UniMelb Store',
    sizes: ['M', 'L', 'XL'],
    colors: ['Sandstone & Mustard Navy'],
    materials: ['Double Brushed Varsity Fleece'],
    country: 'Australia',
    collegeName: 'Universities in Australia'
  },
  {
    id: 'uni-9',
    name: 'University of Toronto Classic Crewneck and Pajama Uniform Set',
    category: 'College Uniforms',
    subcategory: 'Lounge Wear',
    price: 3699,
    discount: 10,
    rating: 4.7,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80',
    gender: 'Unisex',
    brand: 'Maple Apparel',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Snow White', 'Oceanic Blue'],
    materials: ['Heavy Combed Maple Cotton'],
    country: 'Canada',
    collegeName: 'Universities in Canada'
  },
  {
    id: 'uni-10',
    name: 'Sorbonne Paris Crest Trim Blazer',
    category: 'College Uniforms',
    subcategory: 'Blazers',
    price: 7999,
    discount: 15,
    rating: 4.8,
    reviewsCount: 92,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    gender: 'Unisex',
    brand: 'Parisian Crest',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Midnight Blue', 'Gold Rim'],
    materials: ['Cashmere wool Blend'],
    country: 'Europe',
    collegeName: 'Universities in Europe'
  }
];

// Deterministic Pseudo-Random Generator (PRNG) to keep product attributes consistent
function sRandom(seed: number) {
  let state = seed;
  return function() {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 2147483648;
  };
}

// Category design catalogs
const GEN_DATA: Record<string, {
  subcategories: string[];
  names: string[];
  brands: string[];
  sizes: string[][];
  colors: string[][];
  materials: string[];
  countries: string[];
  images: string[];
  genders: ('Men' | 'Women' | 'Kids' | 'Unisex')[];
}> = {
  "Traditional Wear": {
    subcategories: ["Sarees", "Lehengas", "Kurtas", "Sherwanis", "Anarkali Suits"],
    names: [
      "Royal Handloom Silk Saree", "Classic Banarasi Katan Saree", "Lucknowi Georgette Kurta Set",
      "Bandhani Silk Designer Duo", "Jaipur Cotton Jaipuri Kurta", "Zardozi Embroidered Bridal Lehenga",
      "Groom Collection Velvet Sherwani", "Nehru Jacket with Kurta Set", "South Silk Temple Border Saree",
      "Pashmina Thread Work Kurta", "Kanjivaram Rich Brocade Saree", "Dharamavaram Wedding Saree",
      "Paithani Silk Peacock Motif", "Mysore Crepe Satin Saree", "Tussar Silk Floral Kurti",
      "Kalamkari Printed Cotton Set", "Rajasthani Gota Patti Lehenga", "Chiffon Lucknowi Chikankari",
      "Bhagalpuri Silk Semi-Formal Saree", "Organza Floral Pastel Lehenga", "Premium Jacquard Sherwani Set",
      "Linen Straight Fit Jodhpur Suit", "Satin Silk Pleated Anarkali", "Chanderi Cotton Daily Wear Saree",
      "Pure Georgette Royal Gharara Suit", "Velvet Embroidered Kaftan Series", "Festive Brocade Dhoti Kurta Set",
      "Assam Muga Golden Silk Apparel", "Patola Printed Semi-Silk Saree", "Kashmiri Woolen Embroidered Phiran"
    ],
    brands: ["ReVa Heritage", "ReVa Royal", "Jaipur weaves", "Southern Silk", "Benares Craft", "Lucknowi Thread"],
    sizes: [["Free Size"], ["S", "M", "L", "XL"], ["M", "L", "XL", "XXL"]],
    colors: [
      ["Deep Red", "Golden Mustard", "Emerald Green"],
      ["Deep Teal", "Maroon", "Gold"],
      ["Peach Sparkle", "Soft Lavender"],
      ["Indigo Blue", "Turmeric Yellow", "Ruby Red"],
      ["Orange Saffron", "Royal Blue"]
    ],
    materials: ["Kanchipuram Pure Silk", "Mulberry Satin Silk", "100% Organic Handblock Cotton", "Art Silk", "Velvet", "Banarasi Brocade"],
    countries: ["India"],
    genders: ["Women", "Men", "Unisex"],
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1610030469668-93535c17b6b3?auto=format&fit=crop&w=600&q=80"
    ]
  },
  "Western Wear": {
    subcategories: ["T-Shirts", "Jackets", "Jeans", "Hoodies", "Dresses", "Sweaters"],
    names: [
      "Urban Techwear Oversized Tee", "Distressed Moto Denim Jacket", "Premium Slim Selvedge Jeans",
      "Street Culture Heavyweight Hoodie", "Boho Chic Tiered Midi Dress", "Ribbed knit Turtleneck Sweater",
      "Manhattan Leather Biker Jacket", "Classic Linen Resort Collar Shirt", "Summer Escape Floral Jumpsuit",
      "Retro Corduroy Trucker Jacket", "Cozy Slouchy Knitted Cardigan", "Modern Tonal Pocket Sweatshirt",
      "Chiffon A-Line Elegant Skirt", "Water Repellent Utility Parka", "Premium French Terry Crewneck",
      "Slim Fit Stretch Chino Pants", "Vintage Washed Cotton Flannel", "Classic Breton Stripe Knit Tee",
      "Silk Slip Cocktail Mini Dress", "Active Tech Fleece Mockneck"
    ],
    brands: ["ReVa Cyber", "Denim Lab", "Boho Vibe", "Urbanite", "Aura Apparel", "Pacific Club"],
    sizes: [["S", "M", "L", "XL", "XXL"], ["XS", "S", "M", "L"], ["30", "32", "34", "36"]],
    colors: [
      ["Midnight Black", "Stealth Grey", "Neon Blue"],
      ["Desert Tan", "Forest Green", "Heather Grey", "Charcoal"],
      ["Stone Wash Blue", "Deep Indigo", "Pitch Black"],
      ["Floral Rusty Red", "Olive Green", "Classic Cream"],
      ["Washed Crimson", "Mustard Yellow"]
    ],
    materials: ["Pre-shrunk Combed Cotton", "Heavyweight 14oz Denim", "Japanese Selvedge Denim", "Polyester Fleece Blended Cotton", "Rayon Georgette", "Linen", "French Terry Cotton"],
    countries: ["USA", "Japan", "Spain", "Canada", "Germany"],
    genders: ["Unisex", "Men", "Women"],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80"
    ]
  },
  "Formal Wear": {
    subcategories: ["Suits", "Formal Shirts", "Blazers", "Trousers", "Vests"],
    names: [
      "Executive Pinstripe Wool Suit", "Royal Oxford Cotton Formal Shirt", "Premium Structured Tweed Blazer",
      "Slim Fit Stretch Chino Trousers", "Monarch Velvet Evening Tuxedo", "Italian Herringbone Premium Suit",
      "Bespoke Double-Breasted Blazer", "Comfort Cotton Button-down Shirt", "Sleek Corporate Belted Jumpsuit",
      "Elegant Silk-blend Pencil Skirt", "Classic Twill Regular Fit Trousers", "Fine Merino Knit Waistcoat",
      "Metropolitan Modern Windowpane Suit", "Regal Brocade Dinner Jacket", "Easy Care Dobby Pattern Shirt",
      "High Comfort Super-120s Wool Suit", "Textured Birdseye Classic Blazer", "Empress Satin Corporate Dress",
      "Tailored Tweed Winter Overcoat", "Premium Sateen Stretch Dress Shirt"
    ],
    brands: ["Savile Club", "ReVa Corporate", "ReVa Class", "Milano Sartorial", "Regal Dress"],
    sizes: [["38R", "40R", "42R", "44R"], ["39", "40", "42", "44"], ["S", "M", "L", "XL"]],
    colors: [
      ["Charcoal Grey", "Deep Navy Blue", "Executive Black"],
      ["Crisp White", "Ice Blue", "Soft Lavender"],
      ["Bordeaux Red", "Royal Blue", "Sandy Beige"],
      ["Oxford Charcoal", "Spun Black"]
    ],
    materials: ["Merino Wool Blend", "100% Egyptian Giza Cotton", "Linen and Tweed", "Viscose Poly Tweed"],
    countries: ["UK", "Egypt", "France", "Italy", "Japan"],
    genders: ["Men", "Women", "Unisex"],
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
    ]
  },
  "Night Wear": {
    subcategories: ["Pajamas", "Robes", "Sleepshirts", "Lounge Wear"],
    names: [
      "Mulberry Silk Luxury Sleep Set", "Plush Cotton Comfort Kimono Robe", "Earthy Breathable Linen PJ Set",
      "Bamboo Fiber Eco Slumber Tee", "Soft Velvet Touch Evening Loungewear", "Classic Brushed Flannel Pajama Suit",
      "Organic Jersey Button-up Sleepshirt", "Cozy Microfleece Warm Sleep Pants", "Stretch Blend Thermal Loungewear Set",
      "Luxe Silk Evening Gown & Robe", "Lounge King Combed Cotton Shorts", "Pima Cotton Slouchy Top and Leggings",
      "Cloud Satin Slip Comfort Pajamas", "Ribbed Knit Everyday Lounge Hoodie", "Teddy Fleece Dream Night Pants",
      "Satin Drawstring Premium Lounge Pant", "Casual Lounge Modal PJ Shorts Set", "Classic Striped Sleepwear Combo",
      "Lightweight Crepe Summer Robe", "Weekend Indulgence Plush Lounge Dress"
    ],
    brands: ["Snooze Haven", "CloudSatin", "Luxe Rest", "Cozy Weave", "Dreamscape"],
    sizes: [["S", "M", "L", "XL"], ["M", "L", "XL"], ["Free Size"]],
    colors: [
      ["Navy Blue", "Wine Red", "Emerald Green"],
      ["Classic Black", "Blush Pink", "Soft Ivory"],
      ["Charcoal Heather", "Desert Sand"],
      ["Lilac Sky", "Teal Night"]
    ],
    materials: ["Mulberry Satin Silk", "100% Cotton Poplin", "Pre-shrunk Combed Cotton", "Polyester Fleece Blended Cotton"],
    countries: ["Italy", "USA", "India", "UK", "Canada"],
    genders: ["Women", "Men", "Unisex"],
    images: [
      "https://images.unsplash.com/photo-1608096299210-db7e38487075?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80"
    ]
  },
  "Sports Wear": {
    subcategories: ["Track Pants", "Sports Tees", "Jackets", "Leggings", "Shorts"],
    names: [
      "Aero-Flex High-Waist Gym Leggings", "Stealth Run Quick Dry Sports Tee", "Velocity Water-resistant Windbreaker",
      "Impact Stretch Ergonomic Gym Shorts", "Thermal Insulated Outdoor Jogger", "Aerofit Active Track Pants Pro",
      "Dual Layer Compression Running Shorts", "Hyper ventilation Mesh Sport Tank", "Alpine Trekking Water-resistant Vest",
      "Vanguard Seamless High Intensity Bra", "All-Weather Technical Pullover", "Velocity Pro Athletic Sweatpants",
      "Dry-Fit Comfort Training Shorts Set", "Peak Performance Cycling Jersey", "Reflective Neon Safety Run Vest",
      "Acrobat Yoga Flexible Jumpsuit", "Ultra Comfort Cushioned Sport Socks Pack", "Dynamic Power Muscle Hoodie",
      "Endurance Pro Knit Track Jacket", "Breathe-lite Badminton Skirt Dress"
    ],
    brands: ["ReVa Run", "Aerofit", "Stealth Gym", "Velocity Pro", "Vanguard Sport"],
    sizes: [["S", "M", "L", "XL"], ["XS", "S", "M", "L"], ["M", "L", "XL", "XXL"]],
    colors: [
      ["Asphalt Charcoal", "Stealth Black", "Navy"],
      ["Neon Yellow", "Electric Blue", "Crimson Burst"],
      ["Olive Drab", "Slate Grey", "Carbon Black"],
      ["Royal Indigo", "Pure White", "Jet Black"]
    ],
    materials: ["Polyester Elastane Sport Blend", "Pre-shrunk Combed Cotton", "French Terry Cotton", "Polyester Fleece Blended Cotton"],
    countries: ["USA", "Japan", "Germany", "United Kingdom", "France"],
    genders: ["Unisex", "Men", "Women"],
    images: [
      imgActiveTrackPants,
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80"
    ]
  },
  "Kids Wear": {
    subcategories: ["School Wear", "Casual Tees", "Jackets", "Pajamas", "Frocks"],
    names: [
      "Smart School Cotton Polo Shirt", "Chubby Bear Organic Cotton Romper", "Rainbow Striped Play Tees Pack",
      "Denim Adventure Cute Dungaree Suit", "Cozy Warm Hooded Winter Puffer", "Fairytale Lace Pleated Party Dress",
      "Cute Dinosaur Print Pajama Lounge", "Little Explorer Robust Cargo Pants", "Smart Kids Linen Collar Shirt",
      "Sunny Meadow Gingham Summer Frock", "Primary Colors Everyday Zipper Hoodie", "Toddler Cozy Soft Fleece Set",
      "Classic Tartan Primary School Tunic", "Windproof Lightweight Outdoor Parka", "Teddy Bear Cozy Pullover Sweater",
      "Playground Stretch Cotton Play Shorts", "Sleepy Sheep Snug-Fit PJ Sleepwear", "Floral Garden Lightweight Sundress"
    ],
    brands: ["ReVa Uniforms", "Smart Kids", "Playground Essentials", "Tiny Threads", "Cloud Kids"],
    sizes: [["2 Years", "4 Years", "6 Years"], ["6 Years", "8 Years", "10 Years", "12 Years"]],
    colors: [
      ["Sky Blue", "White", "Lemon Yellow"],
      ["Pastel Mint", "Blush Pink", "Soft Lavender"],
      ["Classic Navy", "Crimson Red", "Forest Green"],
      ["Grey Melange", "Charcoal Noir"]
    ],
    materials: ["Pique Knit Cotton-Poly Blend", "100% Organic Handblock Cotton", "Pre-shrunk Combed Cotton", "Polyester Fleece Blended Cotton"],
    countries: ["India", "USA", "UK", "Canada", "Australia"],
    genders: ["Kids"],
    images: [
      imgSchoolPolo,
      "https://images.unsplash.com/photo-1622295057295-d62f741b02b5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80"
    ]
  },
  "College Uniforms": {
    subcategories: ["Blazers", "Ethnic Wear", "Business Wear", "Suits", "Jackets", "Formal Shirts", "Trousers"],
    names: [
      "Academic Crested Classic Blazer Set", "Campus Official Button-down Dress Shirt", "Institutional Fitted Grey Trousers Set",
      "Collegiate Heavyweight Fleece Varsity Coat", "Prestige Honor Fine Double-breasted Blazer", "Presidential Gold Trim Executive Suit",
      "Student Council Smart Pleated Trouser Set", "Summer Breathable Smart Academic Polo", "Luxe Graduate Cashmere blend Suit",
      "Bespoke College Broadcloth Dress Shirt", "Classic Knit Varsity V-neck Sweater Set", "Campus Athletic Department Joggers Set",
      "Academic Ceremony Embroidered Traditional Pair", "Prep Club Comfort Fit Denim Jacket Set", "Intervarsity High-density Fleece Hooded Top",
      "Dean Collection Royal Tweed Executive Blazer"
    ],
    brands: ["ReVa Academy", "ReVa Collegiate", "Oxford Tweed", "MIT official", "ReVa Uniforms"],
    sizes: [["S", "M", "L", "XL", "XXL"], ["S", "M", "L", "XL"]],
    colors: [
      ["Midnight Blue", "Steel Grey"],
      ["Spun Pure White"],
      ["Oxford Charcoal", "Deep Navy"],
      ["Royal Gold", "Warm Champagne", "Jet Black"]
    ],
    materials: ["Viscose Poly Tweed", "Mercerized Khadi Cotton", "Classic Poplin Blend", "Premium Viscose Poly Tweed, Egyptian Giza Cotton", "Tweed Wollon-blend", "Luxury Wool Blend", "100% Cotton Poplin, Combed Yarn"],
    countries: ["India", "USA", "UK", "Australia", "Canada", "Europe"],
    genders: ["Unisex", "Men", "Women"],
    images: [
      imgIitFormal,
      imgIitSummer,
      imgIitWomen,
      imgIitProduct
    ]
  }
};

const colleges = [
  'Vignan University',
  'Gayatri Vidya Parishad',
  'Raghu Engineering College',
  'IITs',
  'NITs',
  'Universities in USA',
  'Universities in UK',
  'Universities in Australia',
  'Universities in Canada',
  'Universities in Europe'
];

// Extend catalog so that there are at least 50 product items under each section
const generateProducts = (): Product[] => {
  const generated: Product[] = [];
  const categoryKeys = Object.keys(GEN_DATA);
  
  for (const cat of categoryKeys) {
    const staticCount = STATIC_PRODUCTS.filter(p => p.category === cat).length;
    const countNeeded = Math.max(0, 50 - staticCount);
    
    if (countNeeded <= 0) continue;
    
    const meta = GEN_DATA[cat];
    const rand = sRandom(cat.charCodeAt(0) + cat.charCodeAt(cat.length - 1) * 31);
    
    for (let i = 0; i < countNeeded; i++) {
      const pId = `gen-${cat.toLowerCase().substring(0, 4).replace(' ', '')}-${i}`;
      const sub = meta.subcategories[Math.floor(rand() * meta.subcategories.length)];
      
      const baseName = meta.names[Math.floor(rand() * meta.names.length)];
      const computedName = `${baseName} (Series ${i + 101})`;
      
      const price = Math.floor(rand() * 80 + 10) * 100 + 499; // 1499 to 9499 INR
      const discount = [5, 10, 15, 20, 25, 30][Math.floor(rand() * 6)];
      const rating = parseFloat((4.0 + rand() * 0.9).toFixed(1));
      const reviewsCount = Math.floor(rand() * 450) + 10;
      const img = meta.images[Math.floor(rand() * meta.images.length)];
      const gender = meta.genders[Math.floor(rand() * meta.genders.length)];
      const brand = meta.brands[Math.floor(rand() * meta.brands.length)];
      const sizes = meta.sizes[Math.floor(rand() * meta.sizes.length)];
      const colors = meta.colors[Math.floor(rand() * meta.colors.length)];
      const materials = [meta.materials[Math.floor(rand() * meta.materials.length)]];
      const country = meta.countries[Math.floor(rand() * meta.countries.length)];
      
      const product: Product = {
        id: pId,
        name: computedName,
        category: cat,
        subcategory: sub,
        price,
        discount,
        rating,
        reviewsCount,
        image: img,
        gender,
        brand,
        sizes,
        colors,
        materials,
        country,
        isTrending: rand() > 0.75
      };
      
      if (cat === "College Uniforms") {
        product.collegeName = colleges[i % colleges.length];
      }
      
      generated.push(product);
    }
  }
  
  return generated;
};

export const PRODUCTS: Product[] = [...STATIC_PRODUCTS, ...generateProducts()];

export const COLLEGE_LIST = [
  { name: 'Vignan University', country: 'India', city: 'Guntur' },
  { name: 'Gayatri Vidya Parishad', country: 'India', city: 'Visakhapatnam' },
  { name: 'Raghu Engineering College', country: 'India', city: 'Visakhapatnam' },
  { name: 'IITs', country: 'India', city: 'Multiple' },
  { name: 'NITs', country: 'India', city: 'Multiple' },
  { name: 'Universities in USA', country: 'USA', city: 'Multiple' },
  { name: 'Universities in UK', country: 'UK', city: 'Multiple' },
  { name: 'Universities in Australia', country: 'Australia', city: 'Multiple' },
  { name: 'Universities in Canada', country: 'Canada', city: 'Multiple' },
  { name: 'Universities in Europe', country: 'Europe', city: 'Multiple' }
];
