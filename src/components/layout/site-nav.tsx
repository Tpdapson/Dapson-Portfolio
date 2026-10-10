"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { FileText, Folder, Phone, Smiley } from "@phosphor-icons/react/dist/ssr";
import { easeOut } from "@/components/motion/primitives";
import { external, links } from "@/content/site";

const items = [
  { label: "Work", href: "/#work", Icon: Folder },
  { label: "About", href: "/#about", Icon: Smiley },
  { label: "Resume", href: links.resume, Icon: FileText },
  { label: "Contact", href: "#contact", Icon: Phone },
];

/**
 * Site-wide top navigation, rendered once in the root layout. It sticks to the
 * top, slides away while scrolling down and comes back on any scroll up.
 */
export function SiteNav() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // While a link is jumping to a section, keep the nav tucked away so it
  // doesn't land on top of the section heading (even when scrolling upward).
  const jumping = useRef<number | null>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!a || a.pathname !== location.pathname || !a.hash) return;
      setHidden(true);
      if (jumping.current) clearTimeout(jumping.current);
      jumping.current = window.setTimeout(() => (jumping.current = null), 1600);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - (scrollY.getPrevious() ?? 0);
    setScrolled(y > 8);
    if (jumping.current) return;
    // Always show near the top; ignore tiny jitters in either direction.
    if (y < 120) setHidden(false);
    else if (delta > 6) setHidden(true);
    else if (delta < -6) setHidden(false);
  });

  return (
    <motion.div
      className={`sticky top-0 z-40 transition-[background-color,backdrop-filter,box-shadow] duration-300 ${
        scrolled ? "bg-white/85 shadow-[0_1px_0_rgb(0_0_0/0.06)] backdrop-blur-md" : "bg-white"
      }`}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={reduce ? { duration: 0 } : { duration: 0.35, ease: easeOut }}
      // Keyboard users tabbing into the nav should always see it.
      onFocusCapture={() => setHidden(false)}
    >
      <motion.header
        className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-5 sm:px-10"
        initial={reduce ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        <Link href="/" className="flex items-center gap-2">
          <span className="relative size-10 overflow-hidden rounded-[10px] bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/timi.png" alt="" className="size-full object-cover" />
          </span>
          <span className="text-base text-ink">Dapson</span>
        </Link>

        <nav className="-mr-2 flex items-center sm:mr-0 sm:gap-4">
          {items.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              {...external(href)}
              aria-label={label}
              // Icon-only on phones, so give each a full 40px tap target there.
              className="group flex size-10 items-center justify-center gap-1.5 rounded-full text-sm sm:size-auto sm:p-1 text-ink-3 transition-colors hover:text-ink"
            >
              <Icon size={14} className="size-[18px] transition-transform sm:size-3.5 duration-300 ease-out group-hover:-rotate-12 group-hover:scale-110" />
              <span className="hidden sm:inline">{label}</span>
            </a>
          ))}
          <span className="flex items-center gap-1.5 p-1 pl-2 text-sm text-ink-3 sm:pl-1" title="Open to work">
            <span className="relative flex size-4 items-center justify-center rounded-full bg-[#9ddaa9]" aria-hidden>
              <span className="absolute size-2 animate-ping rounded-full bg-[#329746] opacity-50 motion-reduce:animate-none" />
              <span className="size-2 rounded-full bg-[#329746]" />
            </span>
            <span className="hidden md:inline">Open to work</span>
          </span>
        </nav>
      </motion.header>
    </motion.div>
  );
}
