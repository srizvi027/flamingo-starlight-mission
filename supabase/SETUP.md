# Supabase setup

1. Create a Supabase project and open **SQL Editor** in its dashboard.
2. Run the contents of `supabase/schema.sql`. This creates the donations table and a private receipt bucket. If the table already exists, rerun the updated script to add the public-list consent and phone columns and install the fundraising-total function; existing donors stay private by default. The browser has no direct database or storage access; only the server uses the secret key.
3. Copy the project URL and secret key from **Project Settings → API Keys**. Never expose the secret key in a `NEXT_PUBLIC_` variable or commit it.
4. Add these values to `.env.local` (or your existing `.env` file):

```dotenv
NEXT_PUBLIC_STARLIGHT_DONATION_URL=https://www.starlight.org.au/donate/?amount=39&selection=once
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SECRET_KEY=your-secret-key
```

5. Restart the Next.js server. Each successfully submitted receipt is saved privately and its entered amount is included in the public total. The recent-donations list starts with Nico's $550 and Joanna's $500 gifts, then shows new donors who opt in using only their first name and amount. The progress bar refreshes within 30 seconds.
6. Before launch, set `totalRaised` in `lib/campaignConfig.ts` to the campaign's starting amount.
7. Receipt amounts are donor-reported and are not confirmed by Starlight or verified by this website. For deployment, set the same environment variables in the hosting provider's server-side settings. Keep `SUPABASE_SECRET_KEY` private.