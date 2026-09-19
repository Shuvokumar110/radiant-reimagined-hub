# Demo Mode: keep every feature working without a backend

Goal: the whole site keeps behaving normally after it leaves Lovable — nothing errors, nothing silently does nothing. Every backend-dependent feature runs on a local "demo" layer stored in the visitor's own browser.

## The idea

One switch (`DEMO_MODE`) turns the site into a self-contained demo. When it is on, the features below use browser storage and fake-but-realistic data instead of a server. All screens, buttons, and flows stay exactly where they are today.

| Feature | Today | In demo mode |
| --- | --- | --- |
| Sign up / sign in | real accounts | instant local account (any email + password), stays signed in, sign-out works |
| Cart | saved on server | saved in this browser (already the case locally) |
| Wishlist | saved on server | saved in this browser |
| Checkout | creates a real order | shows the same confirmation page with a generated order number, saved locally |
| Order confirmation | looks order up on server | reads the locally saved order |
| My account / order history | server orders | locally saved orders |
| Contact form | stores message | shows the same success message, saves locally |
| Team builder quote submit | stores request | same success screen, saved locally |
| Admin pages (orders, messages, users, content) | live data | pre-seeded sample rows, editable in-session, clearly labelled "Demo data" |

Also: a small, dismissible "Demo mode" ribbon so you and the client know saved data lives only in that browser. Easy to remove later.

## Technical approach

- Add `src/lib/demoMode.ts`: `DEMO_MODE` flag (default on, driven by `VITE_DEMO_MODE`), plus a tiny localStorage store helper (namespaced `tidi-demo-*`).
- Add `src/lib/demoBackend.ts`: the fake backend — `signIn/signUp/signOut/getSession`, `placeOrder`, `getOrder`, `listOrders`, `saveMessage`, `listMessages`, `listUsers`, quote submissions, and seeded sample admin data.
- Branch at the existing call sites rather than rewriting them: `useAuth.tsx`, `useAdminRole.ts` (demo user is admin), `useDraftOrders.ts`, `CartContext`, `WishlistContext`, `Checkout`, `OrderConfirmation`, `Account`, `Contact`, and the `src/pages/admin/*` pages. Each keeps its current UI, loading and error states.
- `supabase/functions/*` and the database stay untouched — turning `DEMO_MODE` off restores the real backend as-is.
- Add `public/.htaccess` (SPA rewrite) so `/shop` and page refreshes work on Hostinger.

## Out of scope

Payments, emails, real order processing.
