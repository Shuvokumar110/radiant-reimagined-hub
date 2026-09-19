export const FREE_SHIPPING_THRESHOLD = 1000;

export const SHIPPING_OPTIONS = [
  {
    id: "standard",
    label: "Standard delivery",
    description: "7-12 business days",
    price: 25,
  },
  {
    id: "express",
    label: "Express delivery",
    description: "3-5 business days",
    price: 60,
  },
] as const;

export type ShippingMethod = (typeof SHIPPING_OPTIONS)[number]["id"];

export function shippingCost(method: ShippingMethod, subtotal: number) {
  if (subtotal >= FREE_SHIPPING_THRESHOLD && method === "standard") return 0;
  return SHIPPING_OPTIONS.find((o) => o.id === method)?.price ?? 25;
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value || 0);
}
