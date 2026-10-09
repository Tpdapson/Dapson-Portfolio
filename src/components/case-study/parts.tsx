"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { easeOut, FadeUp, MaskLines } from "@/components/motion/primitives";
import { cardCover, getCaseStudy, type CaseStudy } from "@/content/case-studies";
import { external } from "@/content/site";

export function CaseHero({ study }: { study: CaseStudy }) {
  const reduce = useReducedMotion();
  return (
    <section className="flex flex-col gap-10 px-4 py-10 sm:px-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-[clamp(48px,5.6vw,80px)] font-medium leading-none tracking-[-0.03em] text-[#0e0e0e]">
          <MaskLines lines={[study.name]} onMount delay={0.1} />
        </h1>
        <FadeUp onMount delay={0.35} y={12}>
          <p className="text-base font-medium text-[#737373]">{study.tagline}</p>
        </FadeUp>
      </div>
      <motion.div
        className="overflow-hidden bg-[#f4f4f4]"
        initial={reduce ? false : { clipPath: "inset(12% 6% 0% 6% round 32px)", opacity: 0 }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 0px)", opacity: 1 }}
        transition={{ duration: 1.3, ease: easeOut, delay: 0.45 }}
      >
        <motion.div
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
            className="block aspect-[4/3] h-auto w-full object-cover sm:aspect-auto"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export function CaseOverview({ study }: { study: CaseStudy }) {
  const { overview } = study;
  return (
    <section className="flex flex-col gap-12 px-4 pb-20 pt-12 sm:px-10 md:flex-row md:gap-[120px] md:pb-[120px] md:pt-20">
      <FadeUp className="flex flex-col gap-5 md:w-[640px] md:shrink-0">
        <h2 className="text-[28px] font-medium leading-[1.2] tracking-[-0.02em] text-[#0e0e0e]">{overview.heading ?? "Overview"}</h2>
        <p className="text-base font-medium leading-[1.45] text-[#737373]">{overview.body}</p>
        {overview.cta && (
          <a
            href={overview.cta.href}
            {...external(overview.cta.href)}
            className="w-fit rounded-full bg-[#0e0e0e] px-4 py-2.5 text-[13px] font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            {overview.cta.label}
          </a>
        )}
      </FadeUp>
      <FadeUp delay={0.12} className="grid flex-1 grid-cols-2 gap-x-6 gap-y-7">
        {overview.meta.map(([label, value]) => (
          <div key={label} className="flex flex-col gap-1.5">
            <p className="text-[13px] text-[#9a9a9a]">{label}</p>
            <p className="text-[15px] font-medium text-[#0e0e0e]">{value}</p>
          </div>
        ))}
      </FadeUp>
    </section>
  );
}

export function MoreWorks({ study }: { study: CaseStudy }) {
  const others = study.more.map((s) => getCaseStudy(s)).filter((s): s is CaseStudy => !!s);
  return (
    <section className="flex flex-col gap-10 px-4 py-20 sm:px-8">
      <h2 className="text-[clamp(40px,4.4vw,64px)] font-medium tracking-[-0.02em] text-[#141414]">
        <MaskLines lines={["More Works"]} />
      </h2>
      <div className="grid gap-10 md:grid-cols-2">
        {others.map((o, i) => (
          <FadeUp key={o.slug} delay={i * 0.1}>
            <Link href={`/work/${o.slug}`} className="group flex flex-col gap-4">
              <div className="relative aspect-[668/420] overflow-hidden rounded-[32px] border-4 border-white bg-[#f4f4f4]">
                <Image
                  src={cardCover(o.slug)}
                  fill
                  alt={`${o.name} cover`}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
                <span className="absolute right-5 top-5 flex size-11 scale-75 items-center justify-center rounded-full bg-[#0e0e0e] text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                  <ArrowUpRight size={18} />
                </span>
              </div>
              <p className="text-[22px] font-medium tracking-[-0.01em] text-[#0e0e0e]">{o.name}</p>
              <p className="-mt-2 text-[15px] font-medium text-[#737373]">{o.cardTagline}</p>
            </Link>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
