export default function Footer() {
  return (
    <footer className="border-t border-plum/10 pb-28 md:pb-10">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-2">
        <div>
          <p className="font-display text-2xl font-semibold text-plum">Nico Gives Back</p>
          <p className="mt-1">Turning plumbing into something bigger than just a job.</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 font-medium text-plum md:justify-end">
          <li><a href="#story">My Story</a></li><li><a href="#starlight">About Starlight</a></li>
          <li><a href="#support">Where Your Support Helps</a></li><li><a href="#donate">Donate</a></li>
        </ul>
        <p className="text-sm text-ink/70 md:col-span-2">This fundraising campaign supports Starlight Children's Foundation. Donations are completed through Starlight's official donation platform.</p>
        <p className="text-sm text-ink/70 md:col-span-2">
          Created by <a href="https://www.prowingz.com" target="_blank" rel="noreferrer noopener" className="underline underline-offset-2">Prowingz</a>
        </p>
      </div>
    </footer>
  );
}
