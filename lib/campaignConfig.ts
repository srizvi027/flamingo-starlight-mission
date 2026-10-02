// Single source of truth. Update totalRaised ONLY from verified Starlight data.
export const campaignConfig = {
  campaignName: "Nico Gives Back",
  goalAmount: 25000,
  totalRaised: 12450, // placeholder: replace with a verified figure (manual or from a verified source)
  starLightDonationUrl:
    process.env.NEXT_PUBLIC_STARLIGHT_DONATION_URL ?? "https://www.starlight.org.au/donate",
  starlightWebsite: "https://www.starlight.org.au",
};
export const percentRaised = Math.min(
  100,
  Math.round((campaignConfig.totalRaised / campaignConfig.goalAmount) * 1000) / 10
);
export const money = (n: number) => "$" + n.toLocaleString("en-AU");
