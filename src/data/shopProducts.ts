// Shop-specific product data — populated as products are uploaded

export interface ShopProduct {
  id: string;
  name: string;
  image: string;
  price: string;
  tag?: string;
}

export const shopProductsByCategory: Record<string, ShopProduct[]> = {
  soccer: [],
  basketball: [],
  "american-football": [],
  "baseball-softball": [],
  volleyball: [],
  netball: [],
  cricket: [],
  tracksuits: [],
  hoodies: [],
  "polo-jerseys": [],
  "sports-jersey": [],
};
