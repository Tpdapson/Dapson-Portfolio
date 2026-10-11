"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { easeOut, FadeUp, MaskLines } from "@/components/motion/primitives";
import { PillButton } from "@/components/ui/pill-button";
import { useOpenImage } from "@/components/case-study/lightbox";
import { ZoomButton } from "@/components/case-study/reveal-image";
import type { CaseStudy } from "@/content/case-studies";
import { external, getWork, type Work } from "@/content/site";

export function CaseHero({ study }: { study: CaseStudy }) {
  const reduce = useReducedMotion();
  const openImage = useOpenImage();
  return (
    <section className="flex flex-col gap-10 px-4 py-10 sm:px-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-[clamp(48px,5.6vw,80px)] font-medium leading-none tracking-[-0.03em] text-ink">
          <MaskLines lines={[study.name]} onMount delay={0.1} />
        </h1>
        <FadeUp onMount delay={0.35} y={12}>
          <p className="text-base font-medium text-body">{study.tagline}</p>
        </FadeUp>
      </div>
      <motion.div
        className="overflow-hidden bg-surface-2"
        initial={reduce ? false : { clipPath: "inset(12% 6% 0% 6% round 32px)", opacity: 0 }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 0px)", opacity: 1 }}
        transition={{ duration: 1.3, ease: easeOut, delay: 0.45 }}
      >
        <motion.div
          className="relative"
          initial={reduce ? false : { scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: easeOut, delay: 0.45 }}
        >
          <Image
            src={study.hero.src}
            width={study.hero.w}
            height={study.hero.h}
            alt={study.hero.alt}
            priority
            sizes="(min-width: 1440px) 1376px, 100vw"
            // Natural shape on every screen, so nothing is cropped.
            className="block h-auto w-full"
          />
          {openImage && <ZoomButton label={study.hero.alt} onClick={() => openImage(study.hero.src)} />}
        </motion.div>
      </motion.div>
    </section>
  );
}

export function CaseOverview({ study }: { study: CaseStudy }) {
  const { overview } = study;
  return (
    <section className="flex flex-col gap-12 px-4 pb-20 pt-12 sm:px-10 lg:flex-row lg:gap-16 xl:gap-[120px] md:pb-[120px] md:pt-20">
      <FadeUp className="flex flex-col gap-5 lg:w-[55%] lg:max-w-[640px] lg:shrink-0">
        <h2 className="text-[28px] font-medium leading-[1.2] tracking-[-0.02em] text-ink">{overview.heading ?? "Overview"}</h2>
        <p className="text-base font-medium leading-[1.45] text-body">{overview.body}</p>
        {overview.cta && (
          <div>
            <PillButton
              href={overview.cta.href}
              label={overview.cta.label}
              icon={ArrowUpRight}
              tone="bg-ink text-on-ink"
              pad="px-4"
              gap="gap-1.5"
              size="sm"
            />
          </div>
        )}
      </FadeUp>
      <FadeUp delay={0.12} className="grid flex-1 grid-cols-2 gap-x-6 gap-y-7">
        {overview.meta.map(([label, value]) => (
          <div key={label} className="flex flex-col gap-1.5">
            <p className="text-[13px] text-subtle">{label}</p>
            <p className="text-[15px] font-medium text-ink">{value}</p>
          </div>
        ))}
      </FadeUp>
    </section>
  );
}

/** Suggested projects, using the same name, tagline and cover as the home page. */
export function MoreWorks({ study }: { study: CaseStudy }) {
  const others = study.more.map(getWork).filter((w): w is Work => !!w);
  return (
    <section className="flex flex-col gap-10 px-4 py-20 sm:px-8">
      <h2 className="text-[clamp(40px,4.4vw,64px)] font-medium tracking-[-0.02em] text-ink">
        <MaskLines lines={["More Works"]} />
      </h2>
      <div className="grid gap-10 md:grid-cols-2">
        {others.map((o, i) => (
          <FadeUp key={o.slug} delay={i * 0.1}>
            <Link href={o.href} {...external(o.href)} className="group flex flex-col gap-4">
              {/* Same 1360×800 shape as the home cover, so nothing is cropped. */}
              <div
                className="relative aspect-[1360/800] overflow-hidden rounded-[32px] border-4 border-page"
                style={{ background: o.tone ?? "var(--color-surface-2)" }}
              >
                <Image
                  src={o.cover}
                  fill
                  alt={`${o.name} — ${o.tagline}`}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  quality={90}
                  className="object-cover"
                />
                <span className="absolute right-5 top-5 flex size-11 scale-75 items-center justify-center rounded-full bg-ink text-on-ink opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                  <ArrowUpRight size={18} />
                </span>
              </div>
              <p className="text-[22px] font-medium tracking-[-0.01em] text-ink">{o.name}</p>
              <p className="-mt-2 text-[15px] font-medium text-body">{o.tagline}</p>
            </Link>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
