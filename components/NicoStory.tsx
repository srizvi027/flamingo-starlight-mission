export default function NicoStory() {
  return (
    <section id="story" aria-labelledby="story-h" className="section">
      <div className="grid gap-10 md:grid-cols-[1fr_1.5fr]">
        <h2 id="story-h" className="h2 md:sticky md:top-28 md:self-start">Why I’m Doing This</h2>
        <div className="space-y-6 border-l-4 border-sun pl-6 text-lg leading-8 md:text-xl md:leading-9">
          <p className="font-display text-2xl text-plum md:text-3xl md:leading-snug">Hi, my name is Nico. I’m a young Australian plumber with a goal of using my trade to make a difference in the lives of seriously ill children.</p>
          <p>I’m raising money for the Starlight Children’s Foundation by donating my time and skills through plumbing work, with the aim of turning every job into an opportunity to give back.</p>
          <p>Any donations made through this website will go directly towards supporting Starlight and the incredible work they do to bring happiness, hope and positive experiences to children and their families during difficult times.</p>
          <p>Every donation, no matter the size, can help make a difference. Thank you for supporting me and helping turn plumbing into something bigger than just a job.</p>
          <p className="font-display text-2xl text-blush">Nico</p>
        </div>
      </div>
    </section>
  );
}
