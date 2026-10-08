"use client";

import { motion, useReducedMotion } from "motion/react";
import { FileText, Folder, Smiley } from "@phosphor-icons/react/dist/ssr";
import { easeOut } from "@/components/motion/primitives";
import { links } from "@/content/site";

const items = [
  { label: "Work", href: "#work", Icon: Folder },
  { label: "About", href: "#about", Icon: Smiley },
  { label: "Resume", href: links.resume, Icon: FileText },
  { label: "Contact", href: "#contact", Icon: FileText },
];

export function Nav() {
  const reduce = useReducedMotion();
  return (
    <motion.header
      className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-5 sm:px-10"
      initial={reduce ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: easeOut }}
    >
      <a href="#top" className="flex items-center gap-2">
        <span className="relative size-[34px] overflow-hidden rounded-full bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/timi.png" alt="" className="absolute left-0 top-[-5.41%] h-[118.92%] w-full max-w-none" />
        </span>
        <span className="text-sm font-medium text-ink">Dapson</span>
      </a>

      <nav className="flex items-center gap-1 sm:gap-4">
        {items.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            className="group flex items-center gap-1.5 rounded-full p-1 text-sm text-ink-3 transition-colors hover:text-ink"
          >
            <Icon size={14} className="transition-transform duration-300 ease-out group-hover:-rotate-12 group-hover:scale-110" />
            <span className="hidden sm:inline">{label}</span>
          </a>
        ))}
        <span className="flex items-center gap-1.5 p-1 text-sm text-ink-3">
          {/* TODO: swap for the "Frame 15" status icon from Figma once assets can be exported. */}
          <span className="relative flex size-4 items-center justify-center" aria-hidden>
            <span className="absolute size-2 animate-ping rounded-full bg-[#3fbf5f] opacity-60" />
            <span className="size-2 rounded-full bg-[#3fbf5f]" />
          </span>
          <span className="hidden md:inline">Open to work</span>
        </span>
      </nav>
    </motion.header>
  );
}
