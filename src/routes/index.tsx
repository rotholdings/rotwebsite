import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, MoveUpRight } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import {
  company,
  featuredKitchenVideo,
  heroImage,
  heroProjectImages,
  maphosaGalleries,
  services,
} from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ROT HOLDINGS | Bespoke Architectural Interiors" },
      {
        name: "description",
        content:
          "ROT HOLDINGS creates bespoke kitchens, wardrobes and interiors through considered design, precision manufacturing and professional installation. Established 2002.",
      },
      { property: "og:title", content: "ROT HOLDINGS | Bespoke Architectural Interiors" },
      {
        property: "og:description",
        content:
          "Design. Manufacture. Deliver. Bespoke interiors shaped around the way you live and work.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const heroSlides = [
  { title: "Considered Interiors", category: "ROT HOLDINGS", image: heroImage },
  {
    title: "Oak & Charcoal Island Kitchen",
    category: "Kitchens",
    image: heroProjectImages.kitchen,
  },
  { title: "Noir Kitchen", category: "Kitchens", image: heroProjectImages.noirKitchen },
  { title: "Wardrobe Wall", category: "Wardrobes", image: heroProjectImages.wardrobe },
  { title: "Media Wall", category: "TV Stands & Media Walls", image: heroProjectImages.tvStand },
];

const projectHighlights = maphosaGalleries.map((gallery) => ({
  slug: gallery.slug,
  title: gallery.title,
  category: gallery.category,
  image: gallery.coverImage,
}));

const processSteps = [
  "Project enquiry",
  "Consultation & measurement",
  "Design & visualisation",
  "Quotation & approval",
  "Manufacturing",
  "Installation",
  "Final handover",
];

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = heroSlides[activeSlide];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setActiveSlide((current) => (current + 1) % heroSlides.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <section
        className="home-hero relative flex min-h-[min(900px,100svh)] items-end overflow-hidden bg-charcoal text-ivory"
        aria-label="Featured interior projects"
      >
        <div className="absolute inset-0">
          <img
            key={slide.image}
            src={slide.image}
            alt={`${slide.category} design concept`}
            fetchPriority="high"
            className="hero-image absolute inset-0 h-full w-full object-cover"
          />
          <div className="hero-shade absolute inset-0" />
        </div>
        <div className="container-page relative grid min-h-[min(900px,100svh)] w-full grid-cols-12 items-end gap-5 pb-9 pt-32 sm:pb-14 lg:pb-16">
          <div className="col-span-12 max-w-4xl lg:col-span-8">
            <Reveal>
              <p className="eyebrow mb-7 text-white/75">Design. Manufacture. Deliver.</p>
              <h1 className="display-title max-w-4xl text-[clamp(3.1rem,8vw,7.6rem)] leading-[0.98] text-white">
                Spaces,
                <br />
                made personal.
              </h1>
              <p className="mt-6 text-sm font-medium tracking-wide text-white/80 sm:text-base">
                Designed with care. Made to fit.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/portfolio"
                  className="btn-primary !bg-white !text-navy hover:!bg-white/85"
                >
                  Explore our projects <ArrowUpRight size={15} />
                </Link>
                <Link to="/contact" className="btn-outline-ivory">
                  Start a project
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 mt-10 flex items-end justify-between gap-5 border-t border-white/30 pt-5 lg:col-span-4 lg:mt-0 lg:justify-end lg:border-0 lg:pt-0">
            <div className="min-w-0 lg:max-w-[245px]">
              <p className="eyebrow text-white/65">{slide.category}</p>
              <p className="mt-2 truncate text-sm font-medium text-white sm:text-base">
                {slide.title}
              </p>
              <div className="mt-5 flex items-center gap-2" aria-hidden="true">
                {heroSlides.map((item, index) => (
                  <span
                    key={item.title}
                    className={`h-1 transition-all duration-500 ${
                      index === activeSlide ? "w-10 bg-white" : "w-5 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <a
            href="#introduction"
            className="absolute bottom-16 right-8 hidden items-center gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/70 [writing-mode:vertical-rl] lg:flex"
          >
            Discover ROT <ArrowDown size={14} />
          </a>
        </div>
      </section>

      <section id="introduction" className="py-20 sm:py-28 lg:py-36">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-6">Design. Manufacture. Deliver.</p>
            <h2 className="display-title text-4xl sm:text-5xl lg:text-6xl">
              A better way to shape the spaces you live in.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              ROT HOLDINGS is an established design and manufacturing company delivering bespoke
              interior solutions from first concept through to professional installation.
            </p>
            <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
              Since {company.founded}, our work has brought together technical planning, considered
              materials and skilled joinery to make every space feel distinctly its own.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-8">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy transition-colors hover:text-burgundy"
              >
                Discover our approach <ArrowRight size={15} />
              </Link>
              <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Established {company.founded}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-stone/60 py-20 sm:py-28">
        <div className="container-page">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-5">Recent projects</p>
              <h2 className="display-title max-w-2xl text-4xl sm:text-5xl">
                Made for the way each space is used.
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 border-b border-foreground/30 pb-2 text-xs font-semibold uppercase tracking-[0.15em] hover:border-burgundy hover:text-burgundy"
            >
              View all projects <ArrowRight size={14} />
            </Link>
          </Reveal>
          <div className="mt-12 grid gap-x-7 gap-y-12 md:grid-cols-12">
            {projectHighlights.map((project, index) => (
              <Reveal
                key={project.slug}
                className={index === 0 ? "md:col-span-7" : "md:col-span-5"}
                delay={index * 0.08}
                effect="clip"
              >
                <Link to="/portfolio" className="group block">
                  <div className={`overflow-hidden ${index === 1 ? "md:mt-24" : ""}`}>
                    <img
                      src={project.image}
                      alt={`${project.title} project photography`}
                      width={1600}
                      height={1072}
                      loading="lazy"
                      className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.035] ${
                        index === 0 ? "aspect-[1.28]" : "aspect-[1.08]"
                      }`}
                    />
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="eyebrow">{project.category}</p>
                      <h3 className="display-title mt-2 text-xl sm:text-2xl">{project.title}</h3>
                    </div>
                    <MoveUpRight
                      size={17}
                      className="mt-2 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-burgundy"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-5">What we create</p>
              <h2 className="display-title max-w-3xl text-4xl sm:text-5xl">
                Made for the way a space is used.
              </h2>
            </div>
            <p className="max-w-lg leading-7 text-muted-foreground lg:col-span-4 lg:col-start-9">
              From a single considered piece to a full interior, each brief is resolved with the
              same attention to fit, finish and function.
            </p>
          </Reveal>
          <div className="mt-11 border-t border-border">
            {services.map((service, index) => (
              <Link
                key={service.slug}
                to="/services"
                hash={service.slug}
                className="service-row group grid gap-4 border-b border-border py-6 transition-colors hover:bg-stone/55 sm:grid-cols-[4rem_1fr_2fr_auto] sm:items-center sm:gap-6"
              >
                <span className="text-xs font-medium tabular-nums text-muted-foreground">
                  0{index + 1}
                </span>
                <h3 className="display-title text-2xl sm:text-3xl">{service.name}</h3>
                <p className="max-w-lg text-sm leading-6 text-muted-foreground">{service.short}</p>
                <ArrowUpRight
                  size={18}
                  className="hidden transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:block"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy text-ivory">
        <div className="grid lg:grid-cols-2">
          <Reveal className="min-h-[380px] overflow-hidden lg:min-h-[640px]" effect="clip">
            <video
              src={featuredKitchenVideo}
              poster={maphosaGalleries[0].coverImage}
              aria-label="Kitchen project video from the Maphosa collection"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full min-h-[380px] w-full object-cover lg:min-h-[640px]"
            />
          </Reveal>
          <Reveal className="flex items-center px-6 py-16 sm:px-12 lg:px-[8vw] lg:py-24">
            <div className="max-w-xl">
              <p className="eyebrow mb-5 text-white/60">Made with intention</p>
              <h2 className="display-title text-4xl sm:text-5xl">
                Thought through before the first cut.
              </h2>
              <p className="mt-6 leading-7 text-white/70">
                Every successful installation starts with a clear understanding of the room. Our
                process connects detailed design with careful manufacturing, so the finished work
                feels considered from every angle.
              </p>
              <Link to="/process" className="btn-outline-ivory mt-8">
                Explore our process <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-5">Materials & hardware</p>
            <h2 className="display-title text-4xl sm:text-5xl">
              Good design is built into the details.
            </h2>
            <p className="mt-6 leading-7 text-muted-foreground">
              We select board materials and finishes to suit the design and installation conditions,
              with options including melamine, MDF and woodgrain finishes. ROT HOLDINGS cabinetry
              uses GELMAR hardware, including hinges, drawer runners, soft-close mechanisms and
              functional storage fittings.
            </p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              GELMAR is a hardware supplier; ROT HOLDINGS designs and manufactures the cabinetry.
            </p>
            <Link
              to="/services"
              className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy hover:text-burgundy"
            >
              See our services <ArrowRight size={15} />
            </Link>
          </Reveal>
          <Reveal
            className="grid grid-cols-2 gap-3 lg:col-span-6 lg:col-start-7"
            delay={0.1}
            effect="clip"
          >
            <img
              src={maphosaGalleries[0].media[2].src}
              alt="Kitchen cabinetry from the Maphosa project gallery"
              width={1600}
              height={1072}
              loading="lazy"
              className="aspect-[0.86] w-full object-cover"
            />
            <div className="grid gap-3">
              <img
                src={maphosaGalleries[0].coverImage}
                alt="Kitchen cabinetry from the Maphosa project gallery"
                width={1600}
                height={1072}
                loading="lazy"
                className="aspect-[1.15] w-full object-cover"
              />
              <div className="flex flex-col justify-between bg-stone p-5 sm:p-7">
                <span className="text-xs font-medium text-muted-foreground">
                  Hardware, made useful.
                </span>
                <p className="display-title mt-8 text-2xl sm:text-3xl">
                  Thoughtful function. Lasting finish.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-stone/50 py-20 sm:py-24">
        <div className="container-page">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-5">The project journey</p>
              <h2 className="display-title text-4xl sm:text-5xl">Clear at every stage.</h2>
            </div>
            <Link
              to="/process"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] hover:text-burgundy"
            >
              How we work <ArrowRight size={14} />
            </Link>
          </Reveal>
          <ol className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <Reveal key={step} delay={index * 0.04}>
                <li className="border-t border-border pt-4">
                  <p className="text-xs font-medium tabular-nums text-burgundy">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-sm font-medium leading-6">{step}</h3>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title="Let's shape something that feels like yours."
        text="Tell us what you have in mind. We’ll arrange a consultation and develop a tailored proposal for your space."
      />
    </>
  );
}
