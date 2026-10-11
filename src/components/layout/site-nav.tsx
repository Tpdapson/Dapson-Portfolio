"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { DotsNine, FileText, Folder, Phone, Smiley, X } from "@phosphor-icons/react/dist/ssr";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

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
        scrolled ? "bg-page/85 shadow-[0_1px_0_var(--color-hairline)] backdrop-blur-md" : "bg-page"
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
            <Image src="/images/timi.png" alt="" fill sizes="40px" priority className="object-cover" />
          </span>
          <span className="text-base font-medium text-ink">Dapson</span>
        </Link>

        {/* Desktop: inline links. */}
        <nav className="hidden items-center gap-4 lg:flex">
          {items.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              {...external(href)}
              className="group flex items-center gap-1.5 rounded-full p-1 text-sm text-ink-3 transition-colors hover:text-ink"
            >
              <Icon size={14} className="transition-transform duration-300 ease-out group-hover:-rotate-12 group-hover:scale-110" />
              {label}
            </a>
          ))}
          <span className="flex items-center gap-1.5 p-1 text-sm text-ink-3">
            <StatusDot />
            Open to work
          </span>
        </nav>

        {/* Phones and tablets: menu button. */}
        <button
          ref={menuButton}
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          className="-mr-2 flex size-11 items-center justify-center rounded-full text-ink lg:hidden"
        >
          <DotsNine size={32} />
        </button>
      </motion.header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} returnFocus={menuButton} />
    </motion.div>
  );
}

/**
 * "Open to work" status: a green dot sending out two staggered light-green
 * rings, so it reads as live at a glance. Static for reduced motion.
 */
function StatusDot({ large = false }: { large?: boolean }) {
  const size = large ? "size-3" : "size-2";
  return (
    <span className={`relative flex items-center justify-center ${large ? "size-6" : "size-4"}`} aria-hidden>
      <span className={`absolute ${size} animate-status-ring rounded-full bg-[#6fdc86] motion-reduce:hidden`} />
      <span className={`absolute ${size} animate-status-ring rounded-full bg-[#6fdc86] [animation-delay:0.9s] motion-reduce:hidden`} />
      <span className={`relative ${size} rounded-full bg-[#3db855]`} />
    </span>
  );
}

/**
 * Full-height menu for phones and tablets. Slides in from the right over the
 * page; scrolling is paused while it's open. Rendered into <body> so the
 * sticky nav's slide transform doesn't trap it.
 */
function MobileMenu({
  open,
  onClose,
  returnFocus,
}: {
  open: boolean;
  onClose: () => void;
  returnFocus: React.RefObject<HTMLButtonElement | null>;
}) {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const panel = useRef<HTMLDivElement>(null);
  // True only in the browser, where document.body exists for the portal.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // Pause page scrolling while open (Lenis, or plain overflow without it).
  const unlock = () => {
    lenis?.start();
    document.documentElement.style.removeProperty("overflow");
  };
  // Unlock right away so an in-page link can scroll as the menu closes.
  // Focus goes back to the menu button only when the menu is dismissed;
  // after following a link it would bring the hidden nav back mid-jump.
  const close = (restoreFocus = true) => {
    unlock();
    onClose();
    if (restoreFocus) returnFocus.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    if (lenis) lenis.stop();
    else document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    panel.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      unlock();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, lenis]);

  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panel}
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex h-dvh flex-col bg-page px-4 pb-10 sm:px-10 lg:hidden"
          initial={reduce ? { opacity: 0 } : { x: "100%" }}
          animate={reduce ? { opacity: 1 } : { x: "0%" }}
          exit={reduce ? { opacity: 0 } : { x: "100%" }}
          transition={{ duration: reduce ? 0.15 : 0.55, ease: easeOut }}
        >
          <div className="flex items-center justify-between py-5">
            <Link href="/" onClick={() => close(false)} className="flex items-center gap-2">
              <span className="relative size-10 overflow-hidden rounded-[10px] bg-surface">
                <Image src="/images/timi.png" alt="" fill sizes="40px" className="object-cover" />
              </span>
              <span className="text-base font-medium text-ink">Dapson</span>
            </Link>
            <button
              type="button"
              onClick={() => close()}
              aria-label="Close menu"
              className="-mr-2 flex size-11 items-center justify-center rounded-full text-ink"
            >
              <X size={28} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-2">
            {items.map(({ label, href, Icon }, i) => (
              <motion.a
                key={label}
                href={href}
                {...external(href)}
                onClick={() => close(false)}
                className="group flex items-center gap-4 py-2 text-[clamp(40px,11vw,88px)] font-medium leading-none tracking-[-0.03em] text-ink sm:gap-6"
                initial={reduce ? false : { opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: easeOut, delay: 0.15 + i * 0.06 }}
              >
                <Icon className="size-[0.7em] shrink-0 text-ink-3 transition-transform duration-300 group-active:-rotate-12" />
                {label}
              </motion.a>
            ))}
          </nav>

          <motion.p
            className="flex items-center gap-3 text-xl font-medium text-ink-3"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.45 }}
          >
            <StatusDot large />
            Open to work
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
