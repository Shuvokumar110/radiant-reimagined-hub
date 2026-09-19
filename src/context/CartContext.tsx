import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface CartItem {
  /** unique line key: productId + variant */
  key: string;
  productId: number;
  slug?: string;
  name: string;
  category: string;
  image: string;
  /** unit price in USD */
  unitPrice: number;
  quantity: number;
  size?: string;
  moq?: number;
}

interface AddToCartInput {
  productId: number;
  slug?: string;
  name: string;
  category: string;
  image: string;
  unitPrice: number;
  size?: string;
  moq?: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: AddToCartInput, quantity?: number) => void;
  removeFromCart: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const STORAGE_KEY = "tidi-cart-v2";

function readStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function lineKey(productId: number, size?: string) {
  return `${productId}::${size ?? "default"}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>(() => readStorage());
  const [synced, setSynced] = useState(false);

  // persist locally
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items]);

  // merge + sync with backend when signed in
  useEffect(() => {
    if (!user) {
      setSynced(false);
      return;
    }
    let cancelled = false;

    (async () => {
      const { data } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id);

      if (cancelled) return;

      const remote: CartItem[] = (data || []).map((row: any) => ({
        key: lineKey(row.product_id, row.size ?? undefined),
        productId: row.product_id,
        slug: row.slug ?? undefined,
        name: row.name,
        category: row.category ?? "",
        image: row.image ?? "",
        unitPrice: Number(row.unit_price),
        quantity: row.quantity,
        size: row.size ?? undefined,
        moq: row.moq ?? undefined,
      }));

      setItems((local) => {
        const merged = new Map<string, CartItem>();
        remote.forEach((item) => merged.set(item.key, item));
        local.forEach((item) => {
          const existing = merged.get(item.key);
          merged.set(
            item.key,
            existing ? { ...existing, quantity: Math.max(existing.quantity, item.quantity) } : item
          );
        });
        return Array.from(merged.values());
      });
      setSynced(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [user]);

  // push local state to backend after initial sync
  useEffect(() => {
    if (!user || !synced) return;
    const payload = items.map((item) => ({
      user_id: user.id,
      product_id: item.productId,
      slug: item.slug ?? null,
      name: item.name,
      category: item.category,
      image: item.image,
      unit_price: item.unitPrice,
      quantity: item.quantity,
      size: item.size ?? null,
      moq: item.moq ?? null,
    }));

    (async () => {
      await supabase.from("cart_items").delete().eq("user_id", user.id);
      if (payload.length > 0) {
        await supabase.from("cart_items").insert(payload);
      }
    })();
  }, [items, user, synced]);

  const addToCart = useCallback((item: AddToCartInput, quantity = 1) => {
    const key = lineKey(item.productId, item.size);
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [...prev, { ...item, key, quantity: Math.max(quantity, 1) }];
    });
  }, []);

  const removeFromCart = useCallback((key: string) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((item) => item.key !== key)
        : prev.map((item) => (item.key === key ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
