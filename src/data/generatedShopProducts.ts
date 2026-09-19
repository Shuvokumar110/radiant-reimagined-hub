// Auto-derived shop catalog: turns the Team Builder product data (and its
// multi-view galleries) into shoppable products for the /shop pages.
import type { Product } from "./products";
import { productsBySport, sizeOptions, type SportType, type ProductType } from "./teamBuilderData";
import { getProductGalleryImages } from "./productGalleryImages";

const sportCategoryLabel: Record<SportType, string> = {
  soccer: "Soccer",
  basketball: "Basketball",
  american_football: "American Football",
  baseball_softball: "Baseball & Softball",
  volleyball: "Volleyball",
  netball: "Netball",
  cricket: "Cricket",
  business: "Tracksuits",
};

function resolveCategory(sport: SportType, id: string): string {
  if (sport === "business") {
    if (id.startsWith("polo-")) return "Polo Jerseys";
    if (id.startsWith("hood-")) return "Hoodies";
    if (id.startsWith("jer-")) return "Sports Jersey";
    return "Tracksuits";
  }
  return sportCategoryLabel[sport];
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function hashId(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) % 1_000_000;
  }
  return 100_000 + hash;
}

function buildProduct(sport: SportType, item: ProductType, index: number): Product {
  const gallery = getProductGalleryImages(item.id, sport);
  const images = gallery.length > 0 ? gallery.map((g) => g.image) : [item.image];
  const category = resolveCategory(sport, item.id);
  const price = item.basePrice;
  const usedIds = new Set<number>();
  let id = hashId(`${sport}-${item.id}`);
  while (usedIds.has(id)) id += 1;

  return {
    id,
    sku: `TIDI-${item.id.toUpperCase()}`,
    name: `${item.name} – ${category}`,
    slug: slugify(`${sport}-${item.id}`),
    category,
    price: `$${price.toFixed(2)}`,
    image: images[0],
    images,
    tags: [item.fabricType, item.leadTime === "Rush" ? "Rush Available" : "Team Order"],
    shortDescription: item.shortDescription,
    description: `${item.name} built for ${category.toLowerCase()} teams. ${item.shortDescription}. Fully customizable with your team colors, logos, player names and numbers. ${item.fabricType} construction with a ${item.leadTime.toLowerCase()} production lead time. Minimum order ${item.moq} units.`,
    features: [
      `${item.fabricType} decoration`,
      `Minimum order quantity: ${item.moq} units`,
      `${item.leadTime} lead time`,
      "Custom team colors, logos and numbers",
      "Youth and adult sizing available",
    ],
    sizes: sizeOptions,
    material: item.fabricType,
    outsoles: [],
    moq: item.moq,
    unitPrice: price,
    sport,
    galleryLabels: gallery.map((g) => g.label),
    _index: index,
  } as Product;
}

const seen = new Set<string>();

export const generatedProducts: Product[] = (
  Object.entries(productsBySport) as [SportType, ProductType[]][]
).flatMap(([sport, items]) =>
  items
    .filter((item) => {
      const key = `${sport}-${item.id}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((item, index) => buildProduct(sport, item, index))
);
