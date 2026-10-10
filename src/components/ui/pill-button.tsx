import Link from "next/link";
import type { Icon } from "@phosphor-icons/react";
import { external } from "@/content/site";

/**
 * How the icon moves on hover. The button itself stays still; only the icon
 * gives a small, direction-aware nudge.
 */
const nudges = {
  "up-right": "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
  right: "group-hover:translate-x-1",
  down: "group-hover:translate-y-0.5",
  tilt: "group-hover:-rotate-12",
} as const;

const sizes = {
  // 16px text, 18px icon, 47px tall (landing page CTAs).
  md: { text: "text-base", py: "py-3.5", icon: 18 },
  // 13px text, 14px icon, 36px tall (case-study overview).
  sm: { text: "text-[13px]", py: "py-2.5", icon: 14 },
};

/**
 * Rounded pill button from the Figma file. Padding is set per button (`pad`)
 * because the side with the icon gets slightly different padding for visual
 * balance.
 */
export function PillButton({
  href,
  label,
  icon: IconComp,
  nudge,
  tone,
  pad,
  gap = "gap-2",
  size = "md",
}: {
  href: string;
  label: string;
  icon: Icon;
  nudge: keyof typeof nudges;
  /** Background and text colour classes. */
  tone: string;
  /** Left/right padding classes, e.g. "pl-5 pr-[22px]". */
  pad: string;
  gap?: string;
  size?: keyof typeof sizes;
}) {
  const s = sizes[size];
  const className = `group inline-flex items-center rounded-full font-medium leading-[normal] whitespace-nowrap transition-[filter] duration-300 hover:brightness-[0.97] ${s.text} ${s.py} ${gap} ${pad} ${tone}`;
  const icon = (
    <IconComp
      size={s.icon}
      aria-hidden
      className={`shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${nudges[nudge]}`}
    />
  );

  // In-page anchors and other routes use Link; mailto and external links use <a>.
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {label}
        {icon}
      </Link>
    );
  }
  return (
    <a href={href} {...external(href)} className={className}>
      {label}
      {icon}
    </a>
  );
}
