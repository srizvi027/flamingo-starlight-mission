// Single source of truth. Update totalRaised ONLY from verified Starlight data.
export const campaignConfig = {
  campaignName: "Nico Gives Back",
  goalAmount: 50000,
  totalRaised: 1050,
  starLightDonationUrl:
    process.env.NEXT_PUBLIC_STARLIGHT_DONATION_URL ?? "https://www.starlight.org.au/donate/?amount=39&selection=once",
  starlightWebsite: "https://www.starlight.org.au",
};
export const percentRaised = Math.min(
  100,
  Math.round((campaignConfig.totalRaised / campaignConfig.goalAmount) * 1000) / 10
);
export const money = (n: number) => "$" + n.toLocaleString("en-AU");
