import { ExternalLink } from "lucide-react";
import { campaignConfig } from "@/lib/campaignConfig";
export default function AboutStarlight() {
  return (
    <section id="starlight" aria-labelledby="about-h" className="section">
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="about-h" className="h2">About Starlight</h2>
        <p className="mt-6 text-lg leading-8">Starlight Children's Foundation works to bring happiness, hope and positive experiences to seriously ill children and their families.</p>
        <p className="mt-3 text-sm text-ink/70">This is an independent fundraiser for Starlight and is not the official Starlight website.</p>
        <a href={campaignConfig.starlightWebsite} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-8">Learn More About Starlight <ExternalLink className="h-4 w-4" aria-hidden /></a>
      </div>
    </section>
  );
}
