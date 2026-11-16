import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** "up" fades+rises, "clip" reveals like a curtain (for images) */
  effect?: "up" | "clip";
};

/**
 * GSAP reveal when an element enters the viewport. Respects prefers-reduced-motion.
 */
export function Reveal({ children, className, delay = 0, y = 36, effect = "up" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      el.style.visibility = "visible";
      return;
    }

    let observer: IntersectionObserver | undefined;
    const animate = () => {
      gsap.fromTo(
        el,
        effect === "clip"
          ? { autoAlpha: 0, clipPath: "inset(0 0 12% 0)", scale: 1.04 }
          : { autoAlpha: 0, y },
        effect === "clip"
          ? {
              autoAlpha: 1,
              clipPath: "inset(0 0 0% 0)",
              scale: 1,
              duration: 1.3,
              delay,
              ease: "power3.out",
            }
          : {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              delay,
              ease: "power3.out",
            },
      );
    };

    const ctx = gsap.context(() => {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer?.disconnect();
          ctx?.add(animate);
        },
        { rootMargin: "0px 0px -8% 0px" },
      );
      observer.observe(el);
    }, el);

    return () => {
      observer?.disconnect();
      ctx?.revert();
    };
  }, [delay, y, effect]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
