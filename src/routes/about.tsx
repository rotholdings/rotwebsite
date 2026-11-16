import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import logo from "@/assets/logo-rot.png";
import { company } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | ROT HOLDINGS" },
      {
        name: "description",
        content:
          "ROT HOLDINGS is an established interior design and manufacturing company in South Africa, creating bespoke cabinetry and joinery since 2002.",
      },
      { property: "og:title", content: "About | ROT HOLDINGS" },
      {
        property: "og:description",
        content:
          "Design, development, manufacturing and installation — ROT HOLDINGS brings the whole journey together.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const capabilities = [
  {
    number: "01",
    title: "Technical design",
    text: "Spatial planning and 3D visualisation help resolve proportions, storage and finishes before manufacturing begins.",
  },
  {
    number: "02",
    title: "Manufacturing expertise",
    text: "Cabinetry and joinery are developed with careful attention to material, construction and the details that shape a finish.",
  },
  {
    number: "03",
    title: "Professional installation",
    text: "Design, manufacture and installation are coordinated as parts of the same project, for homes and commercial spaces.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About ROT HOLDINGS"
        title="Experience shaped by making."
        intro={`Established in ${company.founded}, ROT HOLDINGS brings design thinking and manufacturing expertise together to create interiors that are purposeful, personal and made to last.`}
      />

      <section className="py-12 sm:py-20 lg:py-24">
        <div className="container-page">
          <div className="grid gap-4 lg:grid-cols-12">
            <Reveal className="lg:col-span-5" effect="clip">
              <div className="flex min-h-[390px] flex-col justify-between bg-stone p-7 sm:min-h-[540px] sm:p-10">
                <div className="flex items-center justify-between gap-4">
                  <p className="eyebrow">ROT HOLDINGS</p>
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    South Africa · Est. {company.founded}
                  </p>
                </div>
                <img
                  src={logo}
                  alt="ROT HOLDINGS"
                  width={1600}
                  height={540}
                  className="my-12 w-full object-contain"
                />
                <div className="flex items-end justify-between border-t border-navy/15 pt-5">
                  <div>
                    <p className="eyebrow mb-1">Established</p>
                    <p className="display-title text-4xl sm:text-5xl">{company.founded}</p>
                  </div>
                  <p className="text-right text-[0.62rem] font-semibold uppercase leading-5 tracking-[0.14em] text-muted-foreground">
                    {company.location}
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-7" delay={0.1}>
              <div className="flex h-full flex-col justify-between bg-navy p-7 text-white sm:p-10 lg:min-h-[540px]">
                <div>
                  <p className="eyebrow mb-5 text-white/60">Our story · 01</p>
                  <h2 className="display-title max-w-2xl text-4xl sm:text-5xl">
                    Experience in every detail. Purpose in every room.
                  </h2>
                  <p className="mt-6 max-w-2xl leading-7 text-white/75">
                    Since {company.founded}, we have brought design thinking and manufacturing
                    expertise together to create interiors that are purposeful, personal and made to
                    last.
                  </p>
                  <p className="mt-4 max-w-2xl leading-7 text-white/75">
                    From our base in {company.location}, we work with residential and commercial
                    clients to plan, manufacture and install kitchens, wardrobes, media walls and
                    custom joinery.
                  </p>
                </div>
                <div className="mt-12 grid grid-cols-2 gap-5 border-t border-white/20 pt-6 sm:grid-cols-3">
                  <div>
                    <p className="display-title text-2xl">Design</p>
                    <p className="mt-2 text-[0.6rem] uppercase tracking-[0.12em] text-white/55">
                      Thoughtful planning
                    </p>
                  </div>
                  <div>
                    <p className="display-title text-2xl">Make</p>
                    <p className="mt-2 text-[0.6rem] uppercase tracking-[0.12em] text-white/55">
                      Skilled manufacture
                    </p>
                  </div>
                  <div>
                    <p className="display-title text-2xl">Deliver</p>
                    <p className="mt-2 text-[0.6rem] uppercase tracking-[0.12em] text-white/55">
                      Professional fit
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-stone/55 py-16 sm:py-24">
        <div className="container-page">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-5">How we think</p>
              <h2 className="display-title max-w-3xl text-4xl sm:text-5xl">
                Good interiors are resolved, not improvised.
              </h2>
            </div>
            <p className="max-w-lg leading-7 text-muted-foreground lg:col-span-4 lg:col-start-9">
              Every project calls for a balance of use, material and construction. We bring those
              decisions into the design early, where they can be understood and refined together.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-8 border-t border-border pt-7 md:grid-cols-3">
            {capabilities.map((item, index) => (
              <Reveal key={item.number} delay={index * 0.07}>
                <article>
                  <p className="text-xs font-medium tabular-nums text-burgundy">{item.number}</p>
                  <h3 className="display-title mt-5 text-2xl">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-5">From concept to installation</p>
            <h2 className="display-title text-4xl sm:text-5xl">
              The whole journey, thoughtfully connected.
            </h2>
            <p className="mt-6 max-w-xl leading-7 text-muted-foreground">
              Design, development, manufacturing and installation are not separate hand-offs. They
              are connected stages, each informing the next so your project can move forward with
              clarity.
            </p>
            <Link to="/process" className="btn-primary mt-8">
              See our process <ArrowRight size={15} />
            </Link>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" effect="clip">
            <div className="flex min-h-[360px] flex-col justify-between bg-stone p-8 sm:p-10">
              <p className="eyebrow">The project journey · 02</p>
              <p className="display-title max-w-xl text-4xl sm:text-5xl">
                From first sketch to final fit.
              </p>
              <ol className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-5">
                {["Design", "Development", "Manufacturing", "Installation"].map((stage, index) => (
                  <li key={stage} className="flex items-baseline gap-3">
                    <span className="text-xs font-medium tabular-nums text-burgundy">
                      0{index + 1}
                    </span>
                    <span className="text-sm">{stage}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Let’s make your next space work harder."
        text="Talk to us about a residential or commercial interior project."
      />
    </>
  );
}
