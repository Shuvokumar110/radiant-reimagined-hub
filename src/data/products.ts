import style672_1 from "@/assets/products/style-672-1.png";
import style672_2 from "@/assets/products/style-672-2.png";
import style672_3 from "@/assets/products/style-672-3.png";
import style672_4 from "@/assets/products/style-672-4.png";
import style972_1 from "@/assets/products/style-972-1.png";
import giveAKick1 from "@/assets/products/give-a-kick-to-racism-1.png";
import giveAKick2 from "@/assets/products/give-a-kick-to-racism-2.png";
import jerseyRedWhite from "@/assets/products/jersey-red-white.png";
import jerseyOrange from "@/assets/products/jersey-orange.png";
import jerseyGreen from "@/assets/products/jersey-green.png";
import basketballFlame from "@/assets/products/basketball-flame.png";
import basketballGraffiti from "@/assets/products/basketball-graffiti.png";

export interface ProductVariant {
  outsole: string;
  color?: string;
  price: string;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  slug: string;
  category: string;
  price: string;
  image: string;
  images: string[];
  tags: string[];
  description: string;
  shortDescription: string;
  features: string[];
  sizes: string[];
  material: string;
  outsoles: string[];
  colors?: string[];
  variants?: ProductVariant[];
}

// Categories based on the reference image
export const categories = [
  "All",
  "Soccer Boots",
  "Team Uniforms",
  "Jerseys",
  "Tracksuits",
  "Hoodies",
  "T-Shirts",
  "Polo Shirts",
  "Athlete Shorts",
  "Varsity Jackets",
  "Waterproof Jackets",
  "Backpacks",
  "Socks",
  "Youth & Kids",
  "Balls",
  "Special Edition",
];

export const products: Product[] = [
  {
    id: 2195,
    sku: "TIDI-672",
    name: "Soccer Boots – Style 672",
    slug: "style-672",
    category: "Soccer Boots",
    price: "From $166.68",
    image: style672_4,
    images: [style672_4, style672_3, style672_2, style672_1],
    tags: ["Made in Italy", "Kangaroo Leather"],
    shortDescription: "Special Order Only – Individual Sales.",
    description: "The Style 672 represents the pinnacle of Italian craftsmanship. Handcrafted from premium kangaroo leather, these boots deliver exceptional touch, comfort, and durability for the discerning player.",
    features: [
      "Premium kangaroo leather upper",
      "Hand-stitched in Italy",
      "Available in Black & White",
      "Multiple outsole options: FG, SG, MIX, TURF",
      "Anatomical footbed for superior comfort"
    ],
    sizes: ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13"],
    material: "Kangaroo Leather",
    outsoles: ["FG", "SG", "MIX", "TURF"],
    colors: ["Black", "White"],
    variants: [
      { outsole: "FG", color: "Black", price: "$202.30" },
      { outsole: "FG", color: "White", price: "$166.68" },
      { outsole: "SG", color: "Black", price: "$214.28" },
      { outsole: "SG", color: "White", price: "$176.27" },
      { outsole: "MIX", color: "Black", price: "$173.87" },
      { outsole: "MIX", color: "White", price: "$178.67" },
      { outsole: "TURF", color: "Black", price: "$171.47" },
      { outsole: "TURF", color: "White", price: "$176.27" },
    ]
  },
  {
    id: 2190,
    sku: "TIDI-972",
    name: "Soccer Boots – Style 972",
    slug: "style-972",
    category: "Soccer Boots",
    price: "From $146.55",
    image: style972_1,
    images: [style972_1],
    tags: ["Made in Italy", "Calf Leather"],
    shortDescription: "Special Order Only – Individual Sales.",
    description: "The Style 972 brings a modern silhouette to classic Italian bootmaking. Featuring premium calf leather and innovative design elements while maintaining traditional quality.",
    features: [
      "Premium calf leather upper",
      "Italian craftsmanship",
      "Multiple outsole options: FG, SG, MIX, TURF",
      "Modern silhouette design",
      "Anatomical fit"
    ],
    sizes: ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13"],
    material: "Calf Leather",
    outsoles: ["FG", "SG", "MIX", "TURF"],
    variants: [
      { outsole: "FG", price: "$146.55" },
      { outsole: "SG", price: "$158.54" },
      { outsole: "MIX", price: "$161.54" },
      { outsole: "TURF", price: "$158.54" },
    ]
  },
  {
    id: 2204,
    sku: "TIDI-GAKTR",
    name: "Soccer Boots – Give A Kick To Racism",
    slug: "give-a-kick-to-racism",
    category: "Special Edition",
    price: "From $184.66",
    image: giveAKick1,
    images: [giveAKick1, giveAKick2],
    tags: ["Special Edition", "Limited", "Kangaroo Leather"],
    shortDescription: "Special Order Only – Individual Sales.",
    description: "A powerful statement piece that combines athletic excellence with social consciousness. This limited edition boot supports initiatives fighting racism in sports. Crafted from premium kangaroo leather in striking black.",
    features: [
      "Limited edition design",
      "Premium kangaroo leather",
      "Portion of proceeds donated to anti-racism initiatives",
      "Collector's packaging included",
      "Certificate of authenticity"
    ],
    sizes: ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13"],
    material: "Kangaroo Leather",
    outsoles: ["FG", "SG", "MIX", "TURF"],
    colors: ["Black"],
    variants: [
      { outsole: "FG", color: "Black", price: "$184.66" },
      { outsole: "SG", color: "Black", price: "$194.26" },
      { outsole: "MIX", color: "Black", price: "$196.66" },
      { outsole: "TURF", color: "Black", price: "$194.26" },
    ]
  },
  {
    id: 3001,
    sku: "TIDI-JRS-RW",
    name: "Pro Soccer Jersey - Red Storm",
    slug: "jersey-red-storm",
    category: "Jerseys",
    price: "Contact for Quote",
    image: jerseyRedWhite,
    images: [jerseyRedWhite],
    tags: ["Custom", "Team Uniform", "Full Kit"],
    shortDescription: "Complete team kit with jersey, shorts, and socks.",
    description: "Dynamic red and white soccer kit featuring TiDi's signature design elements. Includes customizable jersey, matching shorts with number, and branded socks. Perfect for competitive teams looking to make a statement.",
    features: [
      "Sublimated design - won't fade or peel",
      "Moisture-wicking fabric",
      "Custom name and number included",
      "Matching shorts and socks",
      "Bulk team pricing available"
    ],
    sizes: ["YS", "YM", "YL", "S", "M", "L", "XL", "2XL", "3XL"],
    material: "100% Polyester",
    outsoles: [],
  },
  {
    id: 3002,
    sku: "TIDI-JRS-OR",
    name: "Pro Soccer Jersey - Sunset Orange",
    slug: "jersey-sunset-orange",
    category: "Jerseys",
    price: "Contact for Quote",
    image: jerseyOrange,
    images: [jerseyOrange],
    tags: ["Custom", "Team Uniform", "Full Kit"],
    shortDescription: "Complete team kit with jersey, shorts, and socks.",
    description: "Bold orange gradient soccer kit with modern geometric patterns. Features TiDi's premium sublimation printing for lasting vibrance. Complete with shorts and performance socks.",
    features: [
      "Gradient sublimation print",
      "Lightweight performance fabric",
      "Custom name and number included",
      "Full kit: Jersey, shorts, socks",
      "Team bulk discounts"
    ],
    sizes: ["YS", "YM", "YL", "S", "M", "L", "XL", "2XL", "3XL"],
    material: "100% Polyester",
    outsoles: [],
  },
  {
    id: 3003,
    sku: "TIDI-JRS-GR",
    name: "Pro Soccer Jersey - Forest Green",
    slug: "jersey-forest-green",
    category: "Jerseys",
    price: "Contact for Quote",
    image: jerseyGreen,
    images: [jerseyGreen],
    tags: ["Custom", "Team Uniform", "Full Kit"],
    shortDescription: "Complete team kit with jersey, shorts, and socks.",
    description: "Striking green soccer kit with bold accent stripes. TiDi branding and premium construction throughout. Includes matched shorts with number placement and high-performance socks.",
    features: [
      "Vibrant color-fast printing",
      "Athletic cut for performance",
      "Custom name and number",
      "Complete matching kit",
      "Youth and adult sizes"
    ],
    sizes: ["YS", "YM", "YL", "S", "M", "L", "XL", "2XL", "3XL"],
    material: "100% Polyester",
    outsoles: [],
  },
  {
    id: 3004,
    sku: "TIDI-BBJ-FL",
    name: "Basketball Jersey - Flame Edition",
    slug: "basketball-flame",
    category: "Team Uniforms",
    price: "Contact for Quote",
    image: basketballFlame,
    images: [basketballFlame],
    tags: ["Custom", "Basketball", "Full Kit"],
    shortDescription: "Complete basketball kit with flame design.",
    description: "Eye-catching basketball uniform featuring dramatic flame graphics on a black base. Bold tribal-inspired patterns create an intimidating court presence. Includes jersey, shorts, and branded socks.",
    features: [
      "Premium sublimation flames",
      "Breathable mesh fabric",
      "Custom numbers and names",
      "Matching shorts included",
      "Aggressive game-day look"
    ],
    sizes: ["YS", "YM", "YL", "S", "M", "L", "XL", "2XL", "3XL"],
    material: "100% Polyester Mesh",
    outsoles: [],
  },
  {
    id: 3005,
    sku: "TIDI-BBJ-GR",
    name: "Basketball Jersey - Graffiti Style",
    slug: "basketball-graffiti",
    category: "Team Uniforms",
    price: "Contact for Quote",
    image: basketballGraffiti,
    images: [basketballGraffiti],
    tags: ["Custom", "Basketball", "Full Kit"],
    shortDescription: "Urban-inspired basketball kit with graffiti design.",
    description: "Street-style basketball uniform featuring vibrant orange and purple graffiti artwork. Makes a bold statement on the court with unique abstract patterns. Complete with matching shorts and colorful socks.",
    features: [
      "Urban graffiti artwork",
      "High-contrast colors",
      "Custom player details",
      "Full uniform set",
      "Stand-out design"
    ],
    sizes: ["YS", "YM", "YL", "S", "M", "L", "XL", "2XL", "3XL"],
    material: "100% Polyester Mesh",
    outsoles: [],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return products;
  return products.filter((p) => p.category === category);
}
