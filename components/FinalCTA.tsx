import { Star } from "lucide-react";
export default function FinalCTA() {
  return (
    <section aria-labelledby="final-h" className="relative overflow-hidden bg-plum text-cream">
      <Star className="absolute left-[8%] top-10 h-8 w-8 fill-sun text-sun" aria-hidden />
      <Star className="absolute bottom-12 right-[10%] h-6 w-6 fill-blush text-blush" aria-hidden />
      <div className="section text-center">
        <h2 id="final-h" className="mx-auto max-w-3xl font-display text-4xl font-semibold md:text-5xl">Help Turn Every Job Into a Moment of Happiness</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-cream/85">Support Nico's journey and help Starlight bring happiness, hope and positive experiences to seriously ill children and their families.</p>
        <a href="#donate" className="btn mt-8 bg-sun px-10 text-lg text-plum hover:brightness-105">Donate Now</a>
      </div>
    </section>
  );
}
