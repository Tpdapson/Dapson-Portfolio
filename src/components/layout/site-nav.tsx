"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { FileText, Folder, Phone, Smiley } from "@phosphor-icons/react/dist/ssr";
import { easeOut } from "@/components/motion/primitives";
import { external, links } from "@/content/site";

const items = [
  { label: "Work", href: "/#work", Icon: Folder },
  { label: "About", href: "/#about", Icon: Smiley },
  { label: "Resume", href: links.resume, Icon: FileText },
  { label: "Contact", href: "#contact", Icon: Phone },
];

/** Site-wide top navigation. Rendered once in the root layout. */
export function SiteNav() {
  const reduce = useReducedMotion();
  return (
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

      <nav className="flex items-center gap-1 sm:gap-4">
        {items.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            {...external(href)}
            className="group flex items-center gap-1.5 rounded-full p-1 text-sm text-ink-3 transition-colors hover:text-ink"
          >
            <Icon size={14} className="transition-transform duration-300 ease-out group-hover:-rotate-12 group-hover:scale-110" />
            <span className="hidden sm:inline">{label}</span>
          </a>
        ))}
        <span className="flex items-center gap-1.5 p-1 text-sm text-ink-3">
          <span className="relative flex size-4 items-center justify-center rounded-full bg-[#9ddaa9]" aria-hidden>
            <span className="absolute size-2 animate-ping rounded-full bg-[#329746] opacity-50 motion-reduce:animate-none" />
            <span className="size-2 rounded-full bg-[#329746]" />
          </span>
          <span className="hidden md:inline">Open to work</span>
        </span>
      </nav>
    </motion.header>
  );
}
