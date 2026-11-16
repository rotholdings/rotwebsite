import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { company, projectPricingStatement } from "@/lib/site-data";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Policies | ROT HOLDINGS" },
      {
        name: "description",
        content:
          "Terms of service, quotations, cancellations, refunds and warranty information for ROT HOLDINGS projects.",
      },
      {
        property: "og:title",
        content: "Terms & Policies | ROT HOLDINGS",
      },
      {
        property: "og:description",
        content:
          "Terms of service, quotations, cancellations, refunds and warranty information for ROT HOLDINGS projects.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsPage,
});

const sections = [
  {
    title: "1. Quotations and estimates",
    body: [
      projectPricingStatement,
      "The written quotation will set out the project scope, selected materials, inclusions and quotation validity period.",
    ],
  },
  {
    title: "2. Payments",
    body: [
      "Any deposit and payment milestones will be recorded in the written quotation or project agreement before work begins.",
    ],
  },
  {
    title: "3. Cancellations",
    body: [
      "Cancellation terms and any costs incurred up to cancellation will be set out in the project agreement and subject to applicable consumer law.",
    ],
  },
  {
    title: "4. Refunds",
    body: [
      "Any refund or remedy will be handled in accordance with the project agreement and applicable consumer law.",
    ],
  },
  {
    title: "5. Warranty and workmanship",
    body: [
      "The applicable workmanship and hardware warranty terms will be provided with the written quotation or project agreement.",
    ],
  },
  {
    title: "6. Deliveries and installation",
    body: [
      "Installation dates are agreed in advance and may be adjusted where site readiness, building works or third-party trades cause delay. We will always communicate changes as early as we can.",
    ],
  },
  {
    title: "7. Website content",
    body: [
      "The Maphosa project gallery presents project photographs and videos. Other illustrative images on this website may show design concepts rather than completed client installations. Project references may be shared with permission.",
      `All content on this website belongs to ${company.name} and may not be reproduced without written permission.`,
    ],
  },
  {
    title: "8. Governing law",
    body: [
      "These terms are governed by the laws of the Republic of South Africa. The Consumer Protection Act, 2008 applies to consumers where relevant, in addition to these terms.",
    ],
  },
];

function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & policies."
        intro="Quotations, payments, cancellations, refunds and warranty — plainly stated."
      />
      <section className="py-16 sm:py-20">
        <div className="container-page max-w-3xl">
          <Reveal>
            <p className="mb-10 text-xs text-muted-foreground">Last updated: November 2026.</p>
            {sections.map((s) => (
              <div key={s.title} className="prose-page mb-10">
                <h2 className="display-title mb-4 text-2xl">{s.title}</h2>
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
