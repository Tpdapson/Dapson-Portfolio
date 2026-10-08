import { Icon as Iconify } from "@iconify/react";
import whatsapp from "@iconify-icons/akar-icons/whatsapp-fill";
import linkedin from "@iconify-icons/akar-icons/linkedin-box-fill";
import twitterX from "@iconify-icons/bi/twitter-x";
import behance from "@iconify-icons/basil/behance-solid";
import { SkillPile } from "@/components/sections/skill-pile";
import { external, links } from "@/content/site";

const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Résumé", href: links.resume },
  { label: "Playground", href: links.playground },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "WhatsApp", href: links.socials.whatsapp, icon: whatsapp },
  { label: "X", href: links.socials.x, icon: twitterX },
  { label: "Behance", href: links.socials.behance, icon: behance },
  { label: "LinkedIn", href: links.socials.linkedin, icon: linkedin },
];

export function Footer() {
  return (
    <footer className="relative flex flex-col gap-8 overflow-clip border-t border-tint-12 bg-black px-4 pb-[200px] pt-12 sm:px-20 sm:pb-10">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium leading-[1.3] text-neutral-300">
          {nav.map((l) => (
            <a key={l.label} href={l.href} {...external(l.href)} className="transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              {...external(s.href)}
              aria-label={s.label}
              className="rounded-xl border border-tint-12 bg-tint-06 p-2.5 text-neutral-300 transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
            >
              <Iconify icon={s.icon} width={16} height={16} />
            </a>
          ))}
        </div>
      </div>

      <p className="text-center text-sm font-medium leading-[1.3] text-neutral-300">© 2026 Timilehin Oladapo</p>

      <p
        aria-hidden
        className="bg-gradient-to-b from-[#444] to-[#020202] bg-clip-text text-center text-[clamp(96px,20.8vw,300px)] font-medium leading-none tracking-[-0.06em] text-transparent"
      >
        Dapson
      </p>

      <SkillPile />
    </footer>
  );
}
