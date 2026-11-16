import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import logo from "@/assets/logo-rot.png";
import { company } from "@/lib/site-data";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/portfolio" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header site-header-light fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/95 text-foreground shadow-[0_8px_32px_-20px_rgba(13,31,52,0.2)]">
      <div className="container-page flex h-[4.75rem] items-center justify-between sm:h-20">
        <Link
          to="/"
          aria-label="ROT HOLDINGS — home"
          className="brand-wordmark flex shrink-0 items-center gap-3"
        >
          <img
            src={logo}
            alt="ROT HOLDINGS"
            width={176}
            height={66}
            className="h-12 w-36 object-contain sm:h-[3.75rem] sm:w-44"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="nav-link text-foreground/75 hover:text-foreground"
              data-active={pathname === item.to}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/contact" className="btn-primary hidden !min-h-10 !px-5 !py-2.5 lg:inline-flex">
            Start a project <ArrowUpRight size={14} />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center p-2 lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu size={26} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] h-[100dvh] overflow-y-auto bg-background text-foreground transition-opacity duration-300 lg:hidden ${
          open
            ? "visible pointer-events-auto opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!open}
      >
        <div className="container-page flex h-[4.75rem] items-center justify-between border-b border-border sm:h-20">
          <Link
            to="/"
            aria-label="ROT HOLDINGS — home"
            className="brand-wordmark flex items-center gap-3"
          >
            <img
              src={logo}
              alt="ROT HOLDINGS"
              width={176}
              height={66}
              className="h-12 w-36 object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center p-2"
            aria-label="Close menu"
          >
            <X size={28} strokeWidth={1.5} />
          </button>
        </div>
        <nav
          className="container-page mt-5 flex flex-col divide-y divide-border sm:mt-8"
          aria-label="Mobile"
        >
          {navItems.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              className={`display-title py-5 text-3xl text-navy transition-all duration-300 sm:py-6 sm:text-4xl ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${80 + i * 45}ms` }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="container-page mt-8">
          <Link to="/contact" className="btn-primary w-full">
            Start a project <ArrowUpRight size={16} />
          </Link>
          <a
            href={company.phoneHref}
            className="mt-5 block text-center text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
          >
            {company.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
