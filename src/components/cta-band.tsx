import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";

type CtaBandProps = {
  title?: string;
  text?: string;
};

export function CtaBand({
  title = "Let's build something worth keeping.",
  text = "Tell us about your project and we'll take it from first measurements to final handover.",
}: CtaBandProps) {
  return (
    <section className="border-t border-ivory/10 bg-charcoal py-20 text-ivory sm:py-24">
      <div className="container-page text-center">
        <Reveal>
          <p className="eyebrow mb-5">Start your project</p>
          <h2 className="display-title mx-auto max-w-2xl text-4xl sm:text-5xl">{title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ivory/70">{text}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="btn-outline-ivory">
              Start your enquiry
            </Link>
            <Link to="/portfolio" className="nav-link !text-ivory/70">
              Or browse our work →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
