// Generates a server-side price catalog used by the place-order edge function
// so that prices are never trusted from the browser.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const src = readFileSync("src/data/teamBuilderData.ts", "utf8");
const start = src.indexOf("export const productsBySport");
const end = src.indexOf("export const styleOptionsByProduct");
const block = src.slice(start, end);

function hashId(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) % 1_000_000;
  }
  return 100_000 + hash;
}

const catalog = {};
let sport = null;
for (const line of block.split("\n")) {
  const sportMatch = line.match(/^\s{2}(\w+):\s*\[/);
  if (sportMatch) {
    sport = sportMatch[1];
    continue;
  }
  const idMatch = line.match(/\bid:\s*'([^']+)'/);
  const priceMatch = line.match(/basePrice:\s*([0-9.]+)/);
  const moqMatch = line.match(/moq:\s*(\d+)/);
  if (sport && idMatch && priceMatch) {
    catalog[hashId(`${sport}-${idMatch[1]}`)] = {
      price: Number(priceMatch[1]),
      moq: moqMatch ? Number(moqMatch[1]) : 1,
    };
  }
}

// Hand-written boot products (src/data/products.ts) keep their own ids/prices.
const productsSrc = readFileSync("src/data/products.ts", "utf8");
const legacyBlocks = productsSrc.split(/\n  \{\n/).slice(1);
for (const blockText of legacyBlocks) {
  const id = blockText.match(/id:\s*(\d+),/);
  const price = blockText.match(/price:\s*"(?:From )?\$([0-9.]+)"/);
  if (!id || !price) continue;
  const variants = [...blockText.matchAll(
    /\{\s*outsole:\s*"([^"]+)",\s*color:\s*"([^"]+)",\s*price:\s*"\$([0-9.]+)"\s*\}/g
  )].map((v) => ({ outsole: v[1], color: v[2], price: Number(v[3]) }));
  catalog[Number(id[1])] = {
    price: Number(price[1]),
    moq: 1,
    ...(variants.length ? { variants } : {}),
  };
}

mkdirSync("supabase/functions/_shared", { recursive: true });
writeFileSync(
  "supabase/functions/_shared/price-catalog.json",
  JSON.stringify(catalog, null, 0) + "\n"
);
console.log(`Wrote ${Object.keys(catalog).length} catalog prices`);
