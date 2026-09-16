# Fatima Express — Wholesale Party Supplies

Next.js (App Router, JSX) storefront + admin dashboard for foil balloons, bubble balloons and balloon accessories,
built for Fatima Express (UAE). Tailwind CSS v4 for styling, Supabase for the database/auth, Cloudinary for product
photography.

## Getting started

```bash
npm install
npm run dev
```

Visit http://localhost:3000 (Next picks the next free port if 3000 is busy). The database is already live and
seeded — `npm run dev` alone gives you a working store with 25 products across 3 categories.

## Environment variables

`.env.local` already contains working Supabase + Cloudinary credentials, plus generated admin credentials (see
below). `.env.local.example` is the template if you ever need to point this at a different Supabase project.

## Admin Dashboard

Visit **`/admin`** to manage the store — products, categories, orders, customers, inquiries, coupons and shipping
fees. Sign in at `/admin/login` with:

- **Email:** `admin@fatimaexpress.ae`
- **Password:** `aExdvtSBYcgpwU`

Change these any time by editing `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env.local` — this login is intentionally
independent of Supabase Auth (which is reserved for customer accounts), so it stays reliable even if Supabase's
auth service has issues. Sessions are HMAC-signed cookies (`lib/adminSession.js`), verified by `middleware.js` on
every `/admin/*` request.

What you can manage from there:

- **Categories** — create/edit/hide the three shop sections (Foil Balloons, Bubble & Specialty, Accessories).
- **Products** — name, pricing, sizes, colours, specs, stock, a real photo (via Cloudinary), and a placeholder
  illustration used until a photo is uploaded. Toggling **Active** hides a product from the shop; **Featured** puts
  it on the homepage.
- **Orders** — every checkout, with a status dropdown (pending → confirmed → shipped → delivered / cancelled).
- **Customers** — everyone who has created a storefront account, with their order count and total spend.
- **Inquiries** — Contact page submissions, mark resolved once you've replied.
- **Coupons** — percentage or flat-amount codes with a minimum order and optional expiry; customers apply them at
  checkout.
- **Shipping** — the Dubai free-delivery threshold and the two courier fees, editable without a redeploy.

Admin edits go straight to Supabase and show up on the live storefront immediately (no rebuild needed).

## Database

The schema is already applied to the live Supabase project. If you ever need to re-apply it (a new Supabase
project, for instance):

1. Open the Supabase SQL Editor and run [`supabase/schema.sql`](supabase/schema.sql) — creates `categories`,
   `products`, `orders`, `contact_messages`, `newsletter_subscribers`, `coupons`, `site_settings`, with RLS policies
   for public read / admin-only write.
2. Run [`supabase/seed.sql`](supabase/seed.sql) to load the original 25-product catalogue (auto-generated from what
   used to be the static `src/data/products.js` list — safe to re-run, it upserts by slug).

Note: `schema.sql` isn't safely re-runnable end-to-end (Postgres doesn't support `CREATE POLICY IF NOT EXISTS`), so
on a project that already has these tables, only run the parts you actually need (e.g. just an `ALTER TABLE ... ADD
COLUMN IF NOT EXISTS`).

If the `products`/`categories` tables are ever unreachable, the storefront automatically falls back to the static
catalogue in `src/data/products.js` (`src/lib/catalog.js` handles this) — the site never fully breaks, it just stops
reflecting admin edits until the DB is reachable again.

## Cloudinary

`next.config.mjs` allows images from `res.cloudinary.com`. Uploading a photo for a product in `/admin/products`
signs the upload through `/api/cloudinary/sign` (admin-only) and stores the resulting URL on that product — the
storefront then shows the real photo instead of the generated SVG placeholder automatically.

## Structure

```
src/
  app/
    (storefront)  /, /shop, /shop/[slug], /about, /contact, /login, /register, /account, /checkout
    admin/        /admin/login, /admin (dashboard, categories, products, orders, customers, inquiries, coupons, settings)
    api/cloudinary/sign   signed-upload endpoint, admin-only
  actions/admin/  server actions — one file per admin resource (products.js, orders.js, ...)
  components/     layout, home sections, product cards, cart drawer, admin sidebar/header
  context/        CartContext (localStorage), AuthContext (customer Supabase session), AdminSidebarContext
  data/           site config + the original static catalogue (now used as seed source + offline fallback)
  lib/            Supabase clients (public/customer/admin), catalog data layer, AED formatting, shipping logic
middleware.js     gates /admin/* behind the signed admin cookie
supabase/
  schema.sql      full schema + RLS policies
  seed.sql        auto-generated product/category seed data
```

## Delivery logic

`src/lib/shipping.js` implements the policy you provided: free delivery inside Dubai for orders at/above the
threshold, a standard courier fee for smaller Dubai orders, and a flat courier fee to every other emirate regardless
of order size. All three numbers are editable at `/admin/settings/shipping` (stored in the `site_settings` table);
the constants in `shipping.js` are just the fallback defaults.
