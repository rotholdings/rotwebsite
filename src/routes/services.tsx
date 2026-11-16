import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { projectPricingStatement, services } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | ROT HOLDINGS" },
      {
        name: "description",
        content:
          "Explore bespoke kitchens, built-in wardrobes, media walls and custom joinery by ROT HOLDINGS. Design, manufacturing and professional installation.",
      },
      { property: "og:title", content: "Services | ROT HOLDINGS" },
      {
        property: "og:description",
        content:
          "Bespoke interiors, developed around your space, materials and installation requirements.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we make"
        title="Every interior, made to fit."
        intro="From the first spatial plan to the final installation, each project is shaped around its setting, its materials and the people who use it."
      />

      {services.map((service, index) => (
        <section
          key={service.slug}
          id={service.slug}
          className={`scroll-mt-24 py-16 sm:py-24 ${
            index % 2 === 1 ? "border-y border-border bg-stone/50" : ""
          }`}
        >
          <div className="container-page grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal
              effect="clip"
              className={`lg:col-span-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}
            >
              <img
                src={service.image}
                alt={`${service.name} project photography`}
                width={1600}
                height={1072}
                loading="lazy"
                className="aspect-[1.14] w-full object-cover"
              />
            </Reveal>
            <Reveal
              className={`lg:col-span-5 ${index % 2 === 1 ? "lg:order-1" : "lg:col-start-8"}`}
              delay={0.08}
            >
              <p className="eyebrow mb-4">{String(index + 1).padStart(2, "0")} / Service</p>
              <h2 className="display-title text-4xl sm:text-5xl">{service.name}</h2>
              <p className="mt-5 leading-7 text-muted-foreground">{service.description}</p>
              <ul className="mt-7 grid gap-x-5 gap-y-3 sm:grid-cols-2">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-6">
                    <Check size={15} strokeWidth={1.8} className="mt-1 shrink-0 text-burgundy" />
                    <span className="text-foreground/85">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/contact" className="btn-primary" search={{ service: service.name }}>
                  Arrange a consultation <ArrowRight size={15} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="bg-stone/55 py-14 sm:py-18">
        <div className="container-page grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
            {projectPricingStatement}
          </p>
          <Link to="/contact" className="btn-outline whitespace-nowrap">
            Discuss your project <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <CtaBand
        title="A good project starts with a conversation."
        text="Share your ideas, your space and what matters most. We’ll take it from there."
      />
    </>
  );
}
