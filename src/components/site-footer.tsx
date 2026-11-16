import { Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company, services } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link
            to="/"
            aria-label="ROT HOLDINGS — home"
            className="brand-wordmark inline-flex items-center gap-3 text-ivory"
          >
            <span className="brand-monogram">R</span>
            <span className="flex flex-col">
              <span className="text-[1.3rem] font-semibold leading-none tracking-[-0.06em]">
                ROT
              </span>
              <span className="mt-1 text-[0.55rem] font-semibold uppercase leading-none tracking-[0.3em]">
                Holdings
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/60">
            Design. Manufacture. Deliver. Bespoke interiors and joinery, shaped with care in South
            Africa since {company.founded}.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-5">Explore</p>
          <ul className="space-y-3 text-sm">
            {[
              { label: "Home", to: "/" },
              { label: "Services", to: "/services" },
              { label: "Projects", to: "/portfolio" },
              { label: "Our Process", to: "/process" },
              { label: "About Us", to: "/about" },
              { label: "Contact", to: "/contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-ivory/70 transition-colors hover:text-ivory">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-5">Services</p>
          <ul className="space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to="/services" className="text-ivory/70 transition-colors hover:text-ivory">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-5">Contact</p>
          <ul className="space-y-4 text-sm text-ivory/70">
            <li>
              <a
                href={company.phoneHref}
                className="flex items-start gap-3 transition-colors hover:text-ivory"
              >
                <Phone size={16} className="mt-0.5 shrink-0" strokeWidth={1.5} />
                {company.phone}
              </a>
            </li>
            <li>
              <a
                href={company.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition-colors hover:text-ivory"
              >
                <MessageCircle size={16} className="mt-0.5 shrink-0" strokeWidth={1.5} />
                WhatsApp {company.phone}
              </a>
            </li>
            <li>
              <a
                href={company.emailHref}
                className="flex items-start gap-3 break-all transition-colors hover:text-ivory"
              >
                <Mail size={16} className="mt-0.5 shrink-0" strokeWidth={1.5} />
                {company.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0" strokeWidth={1.5} />
              {company.location}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-[0.72rem] uppercase tracking-[0.18em] text-ivory/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="transition-colors hover:text-ivory">
              Privacy &amp; POPIA
            </Link>
            <Link to="/terms" className="transition-colors hover:text-ivory">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
