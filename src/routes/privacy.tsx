import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { company } from "@/lib/site-data";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy & POPIA | ROT HOLDINGS" },
      {
        name: "description",
        content:
          "How ROT HOLDINGS collects, uses and protects your personal information, in line with South Africa's POPIA.",
      },
      {
        property: "og:title",
        content: "Privacy & POPIA | ROT HOLDINGS",
      },
      {
        property: "og:description",
        content:
          "How ROT HOLDINGS collects, uses and protects your personal information, in line with South Africa's POPIA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "1. Who we are",
    body: [
      `${company.name} ("we", "us") is a bespoke cabinetry company based at ${company.location}. We are the responsible party for the personal information we process under South Africa's Protection of Personal Information Act, 2013 (POPIA).`,
    ],
  },
  {
    title: "2. Information we collect",
    body: [
      "The enquiry form prepares a message in WhatsApp using the details you provide: your name, email address, phone number, location, the service you're interested in, an optional budget range and project details. The form does not submit these details to or store them on this website. If you send the message, WhatsApp processes it and we receive it as part of your conversation.",
      "If you contact us by phone, WhatsApp, email or social media, we keep a record of that conversation for the purpose of quoting and delivering your project.",
    ],
  },
  {
    title: "3. How we use your information",
    body: [
      "We use your information to respond to your enquiry, prepare quotations, schedule consultations, deliveries and installations, and keep you informed while your project runs.",
      "We do not sell, rent or share your personal information with third parties for their own marketing.",
    ],
  },
  {
    title: "4. Cookies and analytics",
    body: [
      "This website uses only the cookies necessary for it to function. Any analytics or marketing cookies will only be used with your consent, and this notice will be updated if that changes.",
    ],
  },
  {
    title: "5. Storage and security",
    body: [
      "Enquiries submitted through this website are stored in a secured, access-controlled database. Access is limited to team members who need it to respond to you and deliver your project.",
      "We apply reasonable technical and organisational measures to protect personal information against loss, unauthorised access or disclosure, as POPIA requires.",
    ],
  },
  {
    title: "6. How long we keep it",
    body: [
      "We keep enquiry and project records only as long as needed to deliver the work and to meet legal, tax and warranty obligations, after which they are deleted or anonymised.",
    ],
  },
  {
    title: "7. Your rights",
    body: [
      "Under POPIA you may ask us to confirm what personal information we hold about you, request a copy, correct or update it, or ask us to delete it, subject to our legal record-keeping duties. You may also object to further processing and may lodge a complaint with the Information Regulator of South Africa.",
      "To exercise any of these rights, contact us using the details below.",
    ],
  },
  {
    title: "8. How to reach us",
    body: [
      `Privacy questions and requests: ${company.email} · ${company.phone} · ${company.location}.`,
    ],
  },
];

function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy & POPIA notice."
        intro="How we handle your personal information, in line with South Africa's Protection of Personal Information Act."
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
