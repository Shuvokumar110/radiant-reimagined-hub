/**
 * Local (frontend-only) stand-in for the previous backend.
 *
 * Everything is stored in the visitor's own browser (localStorage), so the whole
 * site — accounts, cart sync, orders, admin pages, contact messages — keeps
 * working as a demo without any server.
 *
 * Exported as `supabase` so existing call sites keep their shape.
 */

const PREFIX = "tidi-local";

/* ------------------------------------------------------------------ storage */

function read<T = any>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(`${PREFIX}-${key}`);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(`${PREFIX}-${key}`, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
}

function table(name: string): any[] {
  return read<any[]>(`table-${name}`, []);
}

function setTable(name: string, rows: any[]) {
  write(`table-${name}`, rows);
}

function uuid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `id-${Math.random().toString(36).slice(2)}-${Date.now()}`;
}

const nowISO = () => new Date().toISOString();

/* --------------------------------------------------------------- query api */

type Filter = { type: "eq" | "in"; column: string; value: any };

class LocalQuery<T = any> implements PromiseLike<{ data: T; error: null }> {
  private filters: Filter[] = [];
  private sort?: { column: string; ascending: boolean };
  private max?: number;
  private mode: "select" | "insert" | "update" | "delete" = "select";
  private payload: any;
  private singleRow = false;

  constructor(private tableName: string) {}

  select(_columns?: string) {
    if (this.mode === "insert" || this.mode === "update") return this;
    this.mode = "select";
    return this;
  }

  insert(rows: any | any[]) {
    this.mode = "insert";
    this.payload = Array.isArray(rows) ? rows : [rows];
    return this;
  }

  update(values: any) {
    this.mode = "update";
    this.payload = values;
    return this;
  }

  delete() {
    this.mode = "delete";
    return this;
  }

  upsert(rows: any | any[]) {
    return this.insert(rows);
  }

  eq(column: string, value: any) {
    this.filters.push({ type: "eq", column, value });
    return this;
  }

  in(column: string, value: any[]) {
    this.filters.push({ type: "in", column, value });
    return this;
  }

  order(column: string, opts?: { ascending?: boolean }) {
    this.sort = { column, ascending: opts?.ascending ?? true };
    return this;
  }

  limit(count: number) {
    this.max = count;
    return this;
  }

  maybeSingle() {
    this.singleRow = true;
    return this;
  }

  single() {
    this.singleRow = true;
    return this;
  }

  private matches(row: any) {
    return this.filters.every((f) =>
      f.type === "eq" ? row[f.column] === f.value : (f.value ?? []).includes(row[f.column])
    );
  }

  private run() {
    const rows = table(this.tableName);

    if (this.mode === "insert") {
      const created = (this.payload as any[]).map((row) => ({
        id: row.id ?? uuid(),
        created_at: row.created_at ?? nowISO(),
        updated_at: row.updated_at ?? nowISO(),
        ...row,
      }));
      setTable(this.tableName, [...rows, ...created]);
      return this.singleRow ? created[0] ?? null : created;
    }

    if (this.mode === "update") {
      const updated: any[] = [];
      const next = rows.map((row) => {
        if (!this.matches(row)) return row;
        const merged = { ...row, ...this.payload, updated_at: nowISO() };
        updated.push(merged);
        return merged;
      });
      setTable(this.tableName, next);
      return this.singleRow ? updated[0] ?? null : updated;
    }

    if (this.mode === "delete") {
      const kept = rows.filter((row) => !this.matches(row));
      const removed = rows.filter((row) => this.matches(row));
      setTable(this.tableName, kept);
      return this.singleRow ? removed[0] ?? null : removed;
    }

    let result = rows.filter((row) => this.matches(row));
    if (this.sort) {
      const { column, ascending } = this.sort;
      result = [...result].sort((a, b) => {
        const av = a[column];
        const bv = b[column];
        if (av === bv) return 0;
        return (av > bv ? 1 : -1) * (ascending ? 1 : -1);
      });
    }
    if (this.max != null) result = result.slice(0, this.max);
    return this.singleRow ? result[0] ?? null : result;
  }

  then<R1 = { data: T; error: null }, R2 = never>(
    onfulfilled?: ((value: { data: T; error: null }) => R1 | PromiseLike<R1>) | null,
    onrejected?: ((reason: any) => R2 | PromiseLike<R2>) | null
  ): PromiseLike<R1 | R2> {
    let outcome: { data: any; error: any };
    try {
      outcome = { data: this.run(), error: null };
    } catch (err) {
      outcome = { data: null, error: err };
    }
    return Promise.resolve(outcome as any).then(onfulfilled as any, onrejected as any);
  }
}

/* -------------------------------------------------------------------- auth */

type AuthCallback = (event: string, session: any | null) => void;
const authListeners = new Set<AuthCallback>();

function getStoredSession() {
  return read<any | null>("session", null);
}

function setStoredSession(session: any | null) {
  write("session", session);
  authListeners.forEach((cb) => cb(session ? "SIGNED_IN" : "SIGNED_OUT", session));
}

function makeSession(email: string, metadata?: Record<string, any>) {
  const users = table("profiles");
  const existing = users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

  const user = existing ?? {
    id: uuid(),
    email,
    first_name: metadata?.first_name ?? "",
    last_name: metadata?.last_name ?? "",
    created_at: nowISO(),
  };

  if (!existing) {
    setTable("profiles", [...users, user]);
    // demo accounts get admin access so the admin area is viewable
    setTable("user_roles", [
      ...table("user_roles"),
      { id: uuid(), user_id: user.id, role: "admin", created_at: nowISO() },
    ]);
  }

  return {
    access_token: `local-${user.id}`,
    token_type: "bearer",
    expires_in: 3600,
    refresh_token: `local-refresh-${user.id}`,
    user: {
      id: user.id,
      email: user.email,
      user_metadata: { first_name: user.first_name, last_name: user.last_name },
      app_metadata: {},
      aud: "authenticated",
      created_at: user.created_at,
    },
  };
}

const auth = {
  onAuthStateChange(cb: AuthCallback) {
    authListeners.add(cb);
    // mirror Supabase: fire once with the current session
    setTimeout(() => cb(getStoredSession() ? "INITIAL_SESSION" : "SIGNED_OUT", getStoredSession()), 0);
    return {
      data: {
        subscription: {
          unsubscribe: () => authListeners.delete(cb),
        },
      },
    };
  },

  async getSession() {
    return { data: { session: getStoredSession() }, error: null };
  },

  async getUser() {
    return { data: { user: getStoredSession()?.user ?? null }, error: null };
  },

  async signUp({ email, password, options }: any) {
    if (!email || !password) {
      return { data: { user: null, session: null }, error: new Error("Email and password are required") };
    }
    const session = makeSession(email, options?.data);
    setStoredSession(session);
    return { data: { user: session.user, session }, error: null };
  },

  async signInWithPassword({ email, password }: any) {
    if (!email || !password) {
      return { data: { user: null, session: null }, error: new Error("Email and password are required") };
    }
    const session = makeSession(email);
    setStoredSession(session);
    return { data: { user: session.user, session }, error: null };
  },

  async signOut() {
    setStoredSession(null);
    return { error: null };
  },
};

/* --------------------------------------------------------------- functions */

const SHIPPING = { standard: 25, express: 60 };

function placeOrder(body: any) {
  const items: any[] = body?.items ?? [];
  if (items.length === 0) return { error: "Your cart is empty." };

  const subtotal = items.reduce(
    (sum, i) => sum + Number(i.unitPrice ?? 0) * Number(i.quantity ?? 1),
    0
  );
  const method = body.shippingMethod === "express" ? "express" : "standard";
  const shipping_cost = subtotal > 1000 && method === "standard" ? 0 : SHIPPING[method];
  const total = subtotal + shipping_cost;

  const c = body.customer ?? {};
  const id = uuid();
  const stamp = new Date();
  const order = {
    id,
    order_number: `TIDI-${stamp.toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random()
      .toString(36)
      .slice(2, 6)
      .toUpperCase()}`,
    email: c.email ?? "",
    first_name: c.firstName ?? c.first_name ?? "",
    last_name: c.lastName ?? c.last_name ?? "",
    phone: c.phone ?? "",
    address_line1: c.address1 ?? null,
    address_line2: c.address2 ?? null,
    city: c.city ?? null,
    state: c.state ?? null,
    postal_code: c.postalCode ?? null,
    country: c.country ?? null,
    notes: c.notes ?? null,
    shipping_method: method,
    subtotal,
    shipping_cost,
    total,
    payment_status: "pending",
    fulfillment_status: "new",
    created_at: stamp.toISOString(),
  };

  setTable("shop_orders", [...table("shop_orders"), order]);
  setTable("shop_order_items", [
    ...table("shop_order_items"),
    ...items.map((i) => ({
      id: uuid(),
      order_id: id,
      product_id: i.productId ?? null,
      slug: i.slug ?? null,
      name: i.name,
      category: i.category ?? null,
      image: i.image ?? null,
      size: i.size ?? null,
      quantity: Number(i.quantity ?? 1),
      unit_price: Number(i.unitPrice ?? 0),
      line_total: Number(i.unitPrice ?? 0) * Number(i.quantity ?? 1),
    })),
  ]);

  return { orderId: id, orderNumber: order.order_number, total };
}

function getOrder(body: any) {
  const order = table("shop_orders").find((o) => o.id === body?.orderId);
  if (!order) return { error: "Order not found" };
  const items = table("shop_order_items").filter((i) => i.order_id === order.id);
  return { order, items };
}

const functions = {
  async invoke(name: string, opts?: { body?: any }) {
    try {
      if (name === "place-order") return { data: placeOrder(opts?.body), error: null };
      if (name === "get-order") return { data: getOrder(opts?.body), error: null };
      return { data: { ok: true }, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },
};

/* ------------------------------------------------------------------ client */

export const supabase = {
  from: (tableName: string) => new LocalQuery(tableName),
  auth,
  functions,
  channel: () => ({
    on: () => ({ subscribe: () => ({ unsubscribe: () => {} }) }),
    subscribe: () => ({ unsubscribe: () => {} }),
  }),
  removeChannel: () => {},
};

export default supabase;
