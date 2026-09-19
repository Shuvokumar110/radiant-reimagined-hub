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
const legacy = productsSrc.matchAll(/id:\s*(\d+),\s*\n\s*sku:[^\n]*\n\s*name:[^\n]*\n\s*slug:[^\n]*\n\s*category:[^\n]*\n\s*price:\s*"From \$([0-9.]+)"/g);
for (const m of legacy) {
  catalog[Number(m[1])] = { price: Number(m[2]), moq: 1 };
}

mkdirSync("supabase/functions/_shared", { recursive: true });
writeFileSync(
  "supabase/functions/_shared/price-catalog.json",
  JSON.stringify(catalog, null, 0) + "\n"
);
console.log(`Wrote ${Object.keys(catalog).length} catalog prices`);
