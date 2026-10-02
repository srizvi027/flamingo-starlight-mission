import { ExternalLink } from "lucide-react";
import { campaignConfig } from "@/lib/campaignConfig";
export default function WhereMoneyGoes() {
  return (
    <section id="money" aria-labelledby="money-h" className="section">
      <div className="grid gap-8 md:grid-cols-2">
        <h2 id="money-h" className="h2">Where the Money Goes</h2>
        <div className="space-y-4 text-lg">
          <p>We want every supporter to feel confident about where their contribution is going. Donations made through this website are completed through Starlight's official donation platform and support Starlight's work.</p>
          <p>Because this campaign supports Starlight broadly, funds are directed according to Starlight's programs and needs rather than being presented as exclusively allocated to one hospital.</p>
          <a href={campaignConfig.starlightWebsite} target="_blank" rel="noopener noreferrer" className="btn-ghost">Learn More About Starlight <ExternalLink className="h-4 w-4" aria-hidden /></a>
        </div>
      </div>
    </section>
  );
}
