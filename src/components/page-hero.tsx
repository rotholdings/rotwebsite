import { Reveal } from "@/components/reveal";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  intro?: string;
};

export function PageHero({ eyebrow, title, intro }: PageHeroProps) {
  return (
    <section className="bg-charcoal pb-16 pt-40 text-ivory sm:pb-20 sm:pt-44">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h1 className="display-title max-w-3xl text-5xl sm:text-6xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/70">
              {intro}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
