import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { company } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    service: typeof search.service === "string" ? search.service : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contact | ROT HOLDINGS" },
      {
        name: "description",
        content:
          "Start a bespoke kitchen, wardrobe, media wall or joinery project with ROT HOLDINGS in Mabopane, Gauteng.",
      },
      { property: "og:title", content: "Contact | ROT HOLDINGS" },
      {
        property: "og:description",
        content: "Tell ROT HOLDINGS about your interior or joinery project.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { service } = Route.useSearch();

  return (
    <>
      <PageHero
        eyebrow="Start a project"
        title="Tell us what you have in mind."
        intro="Every project begins with a conversation. Share a little about your space and our team will be in touch to discuss the next step."
      />

      <section className="py-14 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-6">Talk to our team</p>
            <h2 className="display-title text-3xl sm:text-4xl">Let’s start with the details.</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
              Call or message us directly, or prepare an enquiry for WhatsApp. You can share
              reference images in the conversation.
            </p>

            <ul className="mt-9 space-y-6 border-t border-border pt-7">
              <li>
                <a
                  href={company.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4"
                >
                  <MessageCircle
                    size={19}
                    className="mt-1 shrink-0 text-burgundy"
                    strokeWidth={1.6}
                  />
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                      WhatsApp
                    </span>
                    <span className="mt-1 block text-sm font-medium group-hover:text-burgundy">
                      {company.phone}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a href={company.phoneHref} className="group flex items-start gap-4">
                  <Phone size={19} className="mt-1 shrink-0 text-burgundy" strokeWidth={1.6} />
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                      Telephone
                    </span>
                    <span className="mt-1 block text-sm font-medium group-hover:text-burgundy">
                      {company.phone}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a href={company.emailHref} className="group flex items-start gap-4">
                  <Mail size={19} className="mt-1 shrink-0 text-burgundy" strokeWidth={1.6} />
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                      Email
                    </span>
                    <span className="mt-1 block break-all text-sm font-medium group-hover:text-burgundy">
                      {company.email}
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-4">
                <MapPin size={19} className="mt-1 shrink-0 text-burgundy" strokeWidth={1.6} />
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Location
                  </span>
                  <span className="mt-1 block text-sm font-medium">{company.location}</span>
                </span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <EnquiryForm initialService={service} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
