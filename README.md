# Nico Gives Back
1. `npm install`
2. Configure the Supabase variables in `.env.local` using `supabase/SETUP.md`.
3. `npm run dev`

- Receipt submissions are added to the displayed total automatically; amounts are donor-reported and not verified by the site.
- Edit goal / totalRaised in `lib/campaignConfig.ts` to set the campaign's starting total.
- Add Nico photo: put `public/nico.jpg` and swap the placeholder in `components/Hero.tsx`.
