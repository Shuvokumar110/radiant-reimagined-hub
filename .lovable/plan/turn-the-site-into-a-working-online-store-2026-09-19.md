# Turn the site into a working online store

Today the shop pages list no products, the cart empties on refresh, the wishlist is a hard-coded demo list, and checkout only pretends to submit. This plan makes buying work end to end with real card payments, while keeping the custom team-order (quote) flow as it is.

## 1. Shop catalog from the images you already uploaded

- Fill every shop category (soccer, basketball, american football, baseball/softball, volleyball, netball, cricket, tracksuits, hoodies, polo jerseys, sports jerseys) from the product images already in the project.
- Each listing gets a name, style number, price, main image and the full set of views, so the product page shows the same gallery as the team builder.
- Category pages get working sort and price filtering, plus a product page with size and quantity selection.

## 2. Cart that sticks around

- Cart saved on the device so it survives refresh and navigation; signed-in shoppers keep their cart across devices.
- Same for the wishlist: real saving, add/remove from any product card or product page, and "move to cart".
- Correct line totals, quantity limits, and per-size lines (one product in two sizes = two lines).

## 3. Real checkout with card payment

- Guest checkout allowed; signing in is optional and just pre-fills details.
- Checkout collects contact and shipping address, shows an order summary with subtotal, shipping and total.
- Payment by card through Lovable's built-in Stripe payments (no Stripe account setup needed from you). The shopper is taken to a secure payment page and returned to a confirmation page.
- Orders are recorded only after payment succeeds, with a readable order number.

## 4. Orders visible to you and the customer

- Confirmation page showing what was bought and the order number.
- Customer account area lists their past shop orders with status.
- Admin area gets a shop-orders view: order list, items, customer details, payment status, and a status selector (paid, processing, shipped, delivered, cancelled).

## 5. Keep the existing quote flow

The custom team outfit builder keeps submitting quote requests, unchanged, and the contact form is wired up so messages are actually stored and visible in admin instead of being discarded.

## Technical notes

- New backend tables: `shop_products` (optional cache/override of the static catalog), `shop_orders`, `shop_order_items`, `cart_items`, `wishlist_items`, `contact_messages`. RLS: users read/write their own rows; admins read all; order inserts happen server-side.
- Cart/wishlist: `CartContext` rewritten with localStorage persistence plus Supabase sync when authenticated; cart item key becomes `productId + size`.
- Payments: enable built-in Stripe payments, then two edge functions — `create-checkout` (creates a Stripe Checkout session from server-recalculated prices) and `stripe-webhook` (verifies signature, marks the order paid, clears the cart). Prices are never trusted from the client.
- Catalog: generated `src/data/shopProducts.ts` entries derived from the existing asset folders, sharing the gallery map used by `productGalleryImages.ts`.
- Routes added: `/checkout/success`, `/orders/:id`, `/admin/shop-orders`, `/admin/messages`. Admin routes stay behind the existing admin-role check.
- Shipping: flat-rate options at checkout (standard/express) with a free-shipping threshold; tax left out for now.

## Not included

Discount codes, inventory/stock counts, refunds from the admin area, and order-status emails. Say the word and any of these can follow.
