import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Our Process | ROT HOLDINGS" },
      {
        name: "description",
        content:
          "See how a ROT HOLDINGS project moves from enquiry and consultation through design, manufacturing and installation.",
      },
      { property: "og:title", content: "Our Process | ROT HOLDINGS" },
      {
        property: "og:description",
        content: "A clear seven-stage process from project enquiry to final handover.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProcessPage,
});

const steps = [
  {
    title: "Project Enquiry",
    text: "Tell us what you would like to create, where the project is located and what you have in mind. Reference images and early measurements can help us understand the brief.",
  },
  {
    title: "Consultation & Measurement",
    text: "We discuss how the space needs to work, review site conditions and take the measurements needed to develop the design.",
  },
  {
    title: "Design & 3D Visualisation",
    text: "We develop a layout and visual direction for the cabinetry, materials and key details so the proposal can be reviewed and refined.",
  },
  {
    title: "Quotation & Approval",
    text: "Once the scope, measurements, materials and design requirements are understood, we prepare a tailored quotation for your review.",
  },
  {
    title: "Manufacturing",
    text: "Following approval, the project moves into production, where the design is translated into carefully made cabinetry and joinery.",
  },
  {
    title: "Installation",
    text: "Our team installs the finished work in coordination with the site and the agreed project requirements.",
  },
  {
    title: "Final Handover",
    text: "We review the completed installation with you and hand over the finished project.",
  },
];

function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="The process"
        title="A clear path from idea to installation."
        intro="Every project is different. A considered sequence keeps the important decisions visible from the first conversation through to the finished space."
      />

      <section className="py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <Reveal>
              <p className="eyebrow mb-5">Design → Development → Manufacturing → Installation</p>
              <h2 className="display-title text-4xl sm:text-5xl">
                Thoughtful work, at every stage.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
                You will know what each stage involves, what decisions are needed and what comes
                next.
              </p>
              <Link to="/contact" className="btn-primary mt-8">
                Start a project <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>

          <ol className="border-t border-border">
            {steps.map((step, index) => (
              <Reveal key={step.title}>
                <li className="grid gap-3 border-b border-border py-7 sm:grid-cols-[4.5rem_1fr] sm:gap-6 sm:py-9">
                  <span className="text-sm font-medium tabular-nums text-burgundy">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="display-title text-2xl sm:text-3xl">{step.title}</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title="Let’s talk about what comes next."
        text="Share your project with our team and we’ll help you take the first step."
      />
    </>
  );
}
