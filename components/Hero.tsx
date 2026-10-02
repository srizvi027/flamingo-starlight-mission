import Image from "next/image";
import { Star, Droplets } from "lucide-react";
export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 md:grid-cols-[1.15fr_1fr] md:py-24">
        <div>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] text-plum sm:text-5xl lg:text-6xl">
            Turning Plumbing Into Something Bigger Than Just a Job
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed">
            Hi, I’m Nico, a young Australian plumber who wanted to find a way to use my work to give something back to the community.
          </p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed">
            I’ve decided to support the Starlight Children’s Foundation by donating a portion of what I earn from every plumbing job I complete.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#donate" className="btn-plum text-lg">Donate Now</a>
            <a href="#story" className="btn-ghost text-lg">Learn My Story</a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-sm">
          <Star className="absolute -left-4 top-6 h-9 w-9 rotate-12 fill-sun text-sun" aria-hidden />
          <Droplets className="absolute -right-3 bottom-24 h-10 w-10 fill-blush text-blush" aria-hidden />
          {/* Replace this block with <Image src="/nico.jpg" alt="Nico, a young Australian plumber" ... /> */}
          <div role="img" aria-label="Photo of Nico, to be added" className="flex aspect-[4/5] items-end justify-center rounded-t-[999px] rounded-b-3xl bg-gradient-to-b from-plum/15 to-blush/20 p-6 shadow-soft">
            <p className="rounded-full bg-cream/90 px-4 py-2 text-sm text-plum">Nico’s photo goes here</p>
          </div>
          <Image src="/logo.png" alt="Flamingo’s Starlight Mission logo" width={130} height={130} className="absolute -bottom-6 -left-4 h-28 w-28 rounded-full bg-cream shadow-soft sm:-left-8 sm:h-32 sm:w-32" priority />
        </div>
      </div>
    </section>
  );
}
