import style672_1 from "@/assets/products/style-672-1.png";
import style672_2 from "@/assets/products/style-672-2.png";
import style672_3 from "@/assets/products/style-672-3.png";
import style672_4 from "@/assets/products/style-672-4.png";
import style972_1 from "@/assets/products/style-972-1.png";
import giveAKick1 from "@/assets/products/give-a-kick-to-racism-1.png";
import giveAKick2 from "@/assets/products/give-a-kick-to-racism-2.png";

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: string;
  image: string;
  images: string[];
  tags: string[];
  description: string;
  features: string[];
  sizes: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Style 672 - Classic",
    slug: "style-672-classic",
    category: "Soccer Boots",
    price: "Contact for Pricing",
    image: style672_1,
    images: [style672_1, style672_2],
    tags: ["Made in Italy", "Kangaroo Leather"],
    description: "The Style 672 Classic represents the pinnacle of Italian craftsmanship. Handcrafted from premium kangaroo leather, these boots deliver exceptional touch, comfort, and durability for the discerning player.",
    features: [
      "Premium kangaroo leather upper",
      "Hand-stitched in Italy",
      "Anatomical footbed",
      "Classic fold-over tongue",
      "Conical studs for optimal traction"
    ],
    sizes: ["6", "7", "8", "9", "10", "11", "12", "13"]
  },
  {
    id: 2,
    name: "Style 672 - Premium",
    slug: "style-672-premium",
    category: "Soccer Boots",
    price: "Contact for Pricing",
    image: style672_2,
    images: [style672_2, style672_1],
    tags: ["Made in Italy", "Premium"],
    description: "The Style 672 Premium elevates classic design with enhanced materials and finishing. Perfect for players who demand excellence in every detail.",
    features: [
      "Select grade kangaroo leather",
      "Premium Italian craftsmanship",
      "Enhanced cushioning system",
      "Precision-molded outsole",
      "Gold accent detailing"
    ],
    sizes: ["6", "7", "8", "9", "10", "11", "12", "13"]
  },
  {
    id: 3,
    name: "Style 672 - Pro",
    slug: "style-672-pro",
    category: "Soccer Boots",
    price: "Contact for Pricing",
    image: style672_3,
    images: [style672_3, style672_4],
    tags: ["Made in Italy", "Pro-Grade"],
    description: "Designed for professional athletes, the Style 672 Pro combines traditional craftsmanship with modern performance technology.",
    features: [
      "Pro-grade kangaroo leather",
      "Lightweight construction",
      "Advanced stud configuration",
      "Reinforced heel counter",
      "Performance insole"
    ],
    sizes: ["6", "7", "8", "9", "10", "11", "12", "13"]
  },
  {
    id: 4,
    name: "Style 672 - Elite",
    slug: "style-672-elite",
    category: "Soccer Boots",
    price: "Contact for Pricing",
    image: style672_4,
    images: [style672_4, style672_3],
    tags: ["Made in Italy", "Elite"],
    description: "The pinnacle of the 672 line, the Elite edition features the finest materials and meticulous attention to detail for uncompromising performance.",
    features: [
      "Elite-grade materials throughout",
      "Master craftsman finishing",
      "Custom-tuned stud pattern",
      "Premium memory foam insole",
      "Limited production run"
    ],
    sizes: ["6", "7", "8", "9", "10", "11", "12", "13"]
  },
  {
    id: 5,
    name: "Style 972",
    slug: "style-972",
    category: "Soccer Boots",
    price: "Contact for Pricing",
    image: style972_1,
    images: [style972_1],
    tags: ["Made in Italy", "Kangaroo Leather"],
    description: "The Style 972 brings a modern silhouette to classic Italian bootmaking. Featuring innovative design elements while maintaining traditional quality.",
    features: [
      "Contemporary silhouette",
      "Premium kangaroo leather",
      "Modern stud configuration",
      "Anatomical fit",
      "Italian craftsmanship"
    ],
    sizes: ["6", "7", "8", "9", "10", "11", "12", "13"]
  },
  {
    id: 6,
    name: "Give A Kick To Racism",
    slug: "give-a-kick-to-racism",
    category: "Special Edition",
    price: "Contact for Pricing",
    image: giveAKick1,
    images: [giveAKick1, giveAKick2],
    tags: ["Special Edition", "Limited"],
    description: "A powerful statement piece that combines athletic excellence with social consciousness. This limited edition boot supports initiatives fighting racism in sports.",
    features: [
      "Limited edition design",
      "Premium materials",
      "Portion of proceeds donated",
      "Collector's packaging",
      "Certificate of authenticity"
    ],
    sizes: ["6", "7", "8", "9", "10", "11", "12", "13"]
  },
  {
    id: 7,
    name: "Give A Kick To Racism - Alt",
    slug: "give-a-kick-to-racism-alt",
    category: "Special Edition",
    price: "Contact for Pricing",
    image: giveAKick2,
    images: [giveAKick2, giveAKick1],
    tags: ["Special Edition", "Limited"],
    description: "The alternate colorway of our Give A Kick To Racism collection. Stand out on the pitch while standing up for equality.",
    features: [
      "Alternate colorway",
      "Limited edition design",
      "Premium materials",
      "Collector's item",
      "Social impact initiative"
    ],
    sizes: ["6", "7", "8", "9", "10", "11", "12", "13"]
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}
