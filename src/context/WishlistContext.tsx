import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/localBackend";
import { useAuth } from "@/hooks/useAuth";

export interface WishlistItem {
  productId: number;
  slug?: string;
  name: string;
  category: string;
  image: string;
  unitPrice?: number;
}

interface WishlistContextType {
  items: WishlistItem[];
  isWishlisted: (productId: number) => boolean;
  toggleWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (productId: number) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
const STORAGE_KEY = "tidi-wishlist-v1";

function readStorage(): WishlistItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>(() => readStorage());
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  useEffect(() => {
    if (!user) {
      setSynced(false);
      return;
    }
    let cancelled = false;

    (async () => {
      const { data } = await supabase.from("wishlist_items").select("*").eq("user_id", user.id);
      if (cancelled) return;

      const remote: WishlistItem[] = (data || []).map((row: any) => ({
        productId: row.product_id,
        slug: row.slug ?? undefined,
        name: row.name,
        category: row.category ?? "",
        image: row.image ?? "",
        unitPrice: row.unit_price ? Number(row.unit_price) : undefined,
      }));

      setItems((local) => {
        const merged = new Map<number, WishlistItem>();
        remote.forEach((i) => merged.set(i.productId, i));
        local.forEach((i) => merged.set(i.productId, merged.get(i.productId) ?? i));
        return Array.from(merged.values());
      });
      setSynced(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    if (!user || !synced) return;
    (async () => {
      await supabase.from("wishlist_items").delete().eq("user_id", user.id);
      if (items.length > 0) {
        await supabase.from("wishlist_items").insert(
          items.map((item) => ({
            user_id: user.id,
            product_id: item.productId,
            slug: item.slug ?? null,
            name: item.name,
            category: item.category,
            image: item.image,
            unit_price: item.unitPrice ?? null,
          }))
        );
      }
    })();
  }, [items, user, synced]);

  const isWishlisted = useCallback(
    (productId: number) => items.some((i) => i.productId === productId),
    [items]
  );

  const toggleWishlist = useCallback((item: WishlistItem) => {
    setItems((prev) =>
      prev.some((i) => i.productId === item.productId)
        ? prev.filter((i) => i.productId !== item.productId)
        : [...prev, item]
    );
  }, []);

  const removeFromWishlist = useCallback((productId: number) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const clearWishlist = useCallback(() => setItems([]), []);

  return (
    <WishlistContext.Provider
      value={{ items, isWishlisted, toggleWishlist, removeFromWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}
