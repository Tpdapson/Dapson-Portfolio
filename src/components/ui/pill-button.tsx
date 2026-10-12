import Link from "next/link";
import type { Icon } from "@phosphor-icons/react";
import { external } from "@/content/site";

const sizes = {
  // 16px text, 18px icon, 47px tall (landing page CTAs).
  md: { text: "text-base", py: "py-3.5", icon: 18 },
  // 14px text, 14px icon, 41px tall (case-study hero link).
  compact: { text: "text-sm", py: "py-3", icon: 14 },
  // 13px text, 14px icon, 36px tall (case-study overview).
  sm: { text: "text-[13px]", py: "py-2.5", icon: 14 },
};

/**
 * Rounded pill button from the Figma file. Padding is set per button (`pad`)
 * because the side with the icon gets slightly different padding for visual
 * balance.
 *
 * Hover (and keyboard focus): the label rolls up out of the pill while an
 * identical copy rises in from below. The pill itself never moves.
 */
export function PillButton({
  href,
  label,
  icon,
  tone,
  pad,
  gap = "gap-2",
  size = "md",
}: {
  href: string;
  label: string;
  icon: Icon;
  /** Background and text colour classes. */
  tone: string;
  /** Left/right padding classes, e.g. "pl-[22px] pr-5". */
  pad: string;
  gap?: string;
  size?: keyof typeof sizes;
}) {
  const s = sizes[size];
  const className = `group relative inline-flex overflow-hidden rounded-full font-medium leading-[normal] whitespace-nowrap ${s.text} ${s.py} ${pad} ${tone}`;
  const IconComp = icon;
  const content = (
    <RollingLabel className={gap}>
      {label}
      <IconComp size={s.icon} aria-hidden className="shrink-0" />
    </RollingLabel>
  );

  // In-page anchors and other routes use Link; mailto and external links use <a>.
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} {...external(href)} className={className}>
      {content}
    </a>
  );
}

// Quick ease-in-out roll. The 180% travel below clears the pill's padding, so
// the label leaves the pill entirely rather than just its own line.
const roll =
  "transition-transform duration-[450ms] ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none";

/**
 * Content that rolls on hover/focus of the nearest `group`: it slides up out
 * of view while a copy rises in from below. The parent needs `overflow-hidden`.
 */
export function RollingLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className="relative flex">
      <span className={`flex items-center ${className} ${roll} group-hover:-translate-y-[180%] group-focus-visible:-translate-y-[180%]`}>
        {children}
      </span>
      <span
        aria-hidden
        className={`absolute inset-0 flex items-center ${className} translate-y-[180%] ${roll} group-hover:translate-y-0 group-focus-visible:translate-y-0`}
      >
        {children}
      </span>
    </span>
  );
}
