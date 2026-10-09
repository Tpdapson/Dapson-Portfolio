"use client";

import { motion, useReducedMotion } from "motion/react";
import { easeOut, FadeUp } from "@/components/motion/primitives";
import { RevealImage } from "@/components/case-study/reveal-image";
import type { Block, CaseStudy } from "@/content/case-studies";
import { external } from "@/content/site";

const stagger = {
  hide: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hide: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};

export function Blocks({ study }: { study: CaseStudy }) {
  return (
    <>
      {study.blocks.map((block, i) => (
        <BlockView key={i} block={block} study={study} />
      ))}
    </>
  );
}

function BlockView({ block, study }: { block: Block; study: CaseStudy }) {
  switch (block.type) {
    case "image":
      return (
        <figure className="flex flex-col gap-4 px-4 py-5 sm:px-8">
          <RevealImage src={block.src} w={block.w} h={block.h} alt={block.alt} />
          {block.caption && (
            <FadeUp>
              <figcaption className="text-sm font-medium text-[#737373]">{block.caption}</figcaption>
            </FadeUp>
          )}
        </figure>
      );
    case "centered":
      return (
        <section className="flex justify-center px-4 py-12 sm:px-8">
          <FadeUp className="flex w-full max-w-[640px] flex-col gap-4">
            <h2 className="text-[clamp(26px,2.2vw,32px)] font-medium leading-[1.2] tracking-[-0.02em] text-[#0e0e0e]">
              {block.heading}
            </h2>
            <p className="text-base font-medium leading-[1.45] text-[#737373]">{block.body}</p>
          </FadeUp>
        </section>
      );
    case "palette":
      return <Palette swatches={block.swatches} />;
    case "split":
      return <Split block={block} study={study} />;
  }
}

function Split({ block, study }: { block: Extract<Block, { type: "split" }>; study: CaseStudy }) {
  const reduce = useReducedMotion();
  return (
    <section className="flex flex-col gap-6 px-4 pb-10 pt-16 sm:px-8 md:flex-row md:gap-16 md:pt-[100px]">
      <FadeUp className="flex shrink-0 flex-col gap-2.5 md:w-[440px]">
        {block.eyebrow && <p className="text-[13px] text-[#9a9a9a]">{block.eyebrow}</p>}
        <h2 className="text-[clamp(24px,2vw,28px)] font-medium leading-[1.2] tracking-[-0.02em] text-[#0e0e0e]">{block.heading}</h2>
        {block.subheading && <p className="text-base font-medium leading-[1.5] text-[#737373]">{block.subheading}</p>}
      </FadeUp>

      <motion.div
        className="flex min-w-0 flex-1 flex-col gap-3.5"
        variants={stagger}
        initial={reduce ? "show" : "hide"}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {block.body?.map((p, i) => (
          <motion.p key={i} variants={item} className="text-base font-medium leading-[1.5] text-[#737373]">
            {p}
          </motion.p>
        ))}

        {block.points && <Points points={block.points} accent={study.accent} />}

        {block.groups?.map((g) => (
          <motion.div key={g.title} variants={item} className="flex flex-col gap-3.5 pt-2">
            <h3 className="text-[17px] font-medium text-[#0e0e0e]">{g.title}</h3>
            <Points points={g.points} accent={study.accent} />
          </motion.div>
        ))}

        {block.findings?.map((f, i) => (
          <motion.div key={f.title} variants={item} className="flex gap-6 border-t border-[#ededed] py-4">
            <span className="text-sm font-medium" style={{ color: study.accent }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-1 flex-col gap-1">
              <p className="text-[17px] font-medium text-[#0e0e0e]">{f.title}</p>
              <p className="text-[15px] font-medium leading-[1.45] text-[#737373]">{f.body}</p>
            </div>
          </motion.div>
        ))}

        {block.lessons && (
          <div className="grid gap-4 pt-4 sm:grid-cols-3">
            {block.lessons.map((l) => (
              <motion.div
                key={l.title}
                variants={item}
                className="flex flex-col gap-2 rounded-3xl p-6"
                style={{ background: study.tint }}
              >
                <p className="text-[17px] font-medium text-[#0e0e0e]">{l.title}</p>
                <p className="text-sm font-medium leading-[1.5] text-[#737373]">{l.body}</p>
              </motion.div>
            ))}
          </div>
        )}

        {block.stats && (
          <div className="grid gap-4 pt-3 sm:grid-cols-2 lg:grid-cols-3">
            {block.stats.map((s) => (
              <motion.div
                key={s.label}
                variants={item}
                className="flex flex-col gap-1.5 rounded-3xl border border-dashed p-6"
                style={{ background: study.tint, borderColor: study.accent }}
              >
                <p className="text-[30px] font-medium tracking-[-0.02em]" style={{ color: study.accent }}>
                  {s.value}
                </p>
                <p className="text-sm font-medium leading-[1.45] text-[#737373]">{s.label}</p>
              </motion.div>
            ))}
          </div>
        )}

        {block.link && (
          <motion.a
            variants={item}
            href={block.link.href}
            {...external(block.link.href)}
            className="w-fit text-[15px] font-medium underline-offset-4 hover:underline"
            style={{ color: study.accent }}
          >
            {block.link.label}
          </motion.a>
        )}
      </motion.div>
    </section>
  );
}

function Points({ points, accent }: { points: string[]; accent: string }) {
  return (
    <>
      {points.map((p) => (
        <motion.div key={p} variants={item} className="flex items-start gap-3">
          <span aria-hidden className="mt-[9px] size-1.5 shrink-0 rounded-full" style={{ background: accent }} />
          <p className="flex-1 text-[15px] font-medium leading-[1.5] text-[#0e0e0e]">{p}</p>
        </motion.div>
      ))}
    </>
  );
}

function Palette({ swatches }: { swatches: { name: string; hex: string; text: string }[] }) {
  const reduce = useReducedMotion();
  return (
    <section className="px-4 pb-10 sm:px-8">
      <motion.div
        className="grid grid-cols-2 border-4 border-white sm:grid-cols-4 lg:grid-cols-8"
        variants={{ hide: {}, show: { transition: { staggerChildren: 0.06 } } }}
        initial={reduce ? "show" : "hide"}
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {swatches.map((s) => (
          <motion.div
            key={s.name}
            className="flex h-[200px] origin-bottom flex-col justify-between px-5 py-7 lg:h-[360px]"
            style={{ background: s.hex, color: s.text }}
            variants={{
              hide: { scaleY: 0.4, opacity: 0 },
              show: { scaleY: 1, opacity: 1, transition: { duration: 0.9, ease: easeOut } },
            }}
          >
            <p className="text-[15px] font-medium">{s.name}</p>
            <p className="text-[13px]">{s.hex}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
