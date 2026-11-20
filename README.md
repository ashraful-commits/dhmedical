# D H Medical Support – Next.js site

Mobile-first Bangla site: doctors, hospitals, ambulance booking, appointments,
DH Family Care membership + insurance help, ambulance partner registration, feedback, admin panel.

**Stack:** Next.js 14 (App Router) · Next.js API routes · MongoDB (Mongoose) · Cloudinary · Tailwind

## Run
```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # http://localhost:3000
```
`.env.local`: `MONGODB_URI`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `ADMIN_KEY`.

## Use
- Open `/admin`, enter `ADMIN_KEY`. Add doctors and hospitals (with photo/logo upload), and manage
  appointments, ambulance bookings, partners, memberships, feedback (status + delete).
- Home page shows partner hospitals automatically once you add them.

## Deploy
Push to GitHub → import in Vercel → add the 5 env vars. In MongoDB Atlas allow Vercel's IPs (0.0.0.0/0 for a start).

## Edit
- Phone/tagline/menu/specialties: `lib/site.js` · Form fields: `lib/forms.js` · Colours: `tailwind.config.js`
- Collections/validation: `lib/models.js`, `app/api/[type]/route.js`
