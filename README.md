# International Skill Zone — Website & Admin Dashboard

A marketing site + admin dashboard for International Skill Zone (PTE/IELTS coaching), built with:

- **TanStack Start** (React 19, file-based routing, server functions) + Vite
- **Tailwind CSS** for styling
- **Supabase** (Postgres, Auth, Storage) for testimonials, registrations, admin-managed
  result images, and editable homepage text
- **Motion** (Framer Motion successor) for animations

## Project structure

- `src/routes/` — pages. `src/routes/index.tsx` is the homepage; `src/routes/_authenticated/admin/*`
  is the password-protected admin dashboard (Testimonials, Results, Site Content, Registrations).
- `src/components/site/` — homepage section components.
- `src/lib/*.functions.ts` — TanStack Start server functions (public reads + admin-only writes).
- `src/lib/content.ts` — static copy/content constants used across the site.
- `src/integrations/supabase/` — Supabase client setup (browser, server, service-role, auth middleware).
- `supabase/migrations/` — SQL migrations for the Supabase database schema.

## Local development

Requires Node.js 20+.

```sh
npm install
npm run dev
```

Copy `.env` and fill in your own Supabase project's credentials (see below) before running.

### Environment variables

| Variable | Where to find it |
|---|---|
| `SUPABASE_URL` / `VITE_SUPABASE_URL` | Supabase Dashboard → Project Settings → API |
| `SUPABASE_PUBLISHABLE_KEY` / `VITE_SUPABASE_PUBLISHABLE_KEY` | Same page — the `anon`/publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | Same page — the `service_role` key (**secret** — server-only, never expose to the client) |
| `SUPABASE_PROJECT_ID` / `VITE_SUPABASE_PROJECT_ID` | Your project ref, e.g. `abcxyz` in `abcxyz.supabase.co` |
| `RESEND_API_KEY` | [resend.com](https://resend.com) → API Keys (used to email registration notifications) |
| `REGISTRATION_NOTIFY_EMAIL` | Inbox that receives new "Book Your Assessment" submissions |

Run the SQL in `supabase/migrations/` (in order) against your Supabase project's SQL editor to
create all required tables, RLS policies, and the `results` storage bucket.

## Database & Admin access

- Sign up for an admin account at `/auth`, then grant it the `admin` role directly in Supabase:
  ```sql
  insert into public.user_roles (user_id, role)
  select id, 'admin' from auth.users where email = 'you@example.com';
  ```
- Admin dashboard lives at `/admin/testimonials`, `/admin/results`, `/admin/content`, `/admin/registrations`.

## Building & deploying

```sh
npm run build
npm run preview   # preview the production build locally
```

This project deploys to **Netlify** (see `netlify.toml`) via Nitro's `netlify` preset —
just connect the repo in Netlify and it builds automatically (build command `npm run build`,
publish directory `dist`). Make sure to add the same environment variables listed above in
Netlify's site settings (Project Configuration → Environment variables).
