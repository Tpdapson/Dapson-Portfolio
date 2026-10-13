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

function Caption({ text }: { text: string }) {
  return (
    <FadeUp>
      <figcaption className="text-sm font-medium text-body">{text}</figcaption>
    </FadeUp>
  );
}

function BlockView({ block, study }: { block: Block; study: CaseStudy }) {
  switch (block.type) {
    // Images sit 12px apart on phones (the same as the gap inside a stacked
    // pair) and 40px apart from tablet up.
    case "image":
      return (
        <figure className="flex flex-col gap-4 px-4 py-1.5 sm:px-8 sm:py-5">
          <RevealImage src={block.src} w={block.w} h={block.h} alt={block.alt} square={study.squareImages} />
          {block.caption && <Caption text={block.caption} />}
        </figure>
      );
    case "pair":
      return (
        // Side by side with Figma's 24px gap (as a share of the 1376px frame).
        // Desktop products (wide screenshots) stack on phones so each is shown
        // large; mobile-app panels stay side by side and open larger on tap.
        <figure className="flex flex-col gap-4 px-4 py-1.5 sm:px-8 sm:py-5">
          <div
            className={`grid ${study.squareImages ? "gap-3 md:grid-cols-2 md:gap-[1.744%]" : "grid-cols-2 gap-[1.744%]"}`}
          >
            {block.images.map((img) => (
              <RevealImage
                key={img.src}
                src={img.src}
                w={img.w}
                h={img.h}
                alt={img.alt}
                square={study.squareImages}
                sizes={
                  study.squareImages ? "(min-width: 1440px) 676px, (min-width: 768px) 50vw, 100vw" : "(min-width: 1440px) 676px, 50vw"
                }
              />
            ))}
          </div>
          {block.caption && <Caption text={block.caption} />}
        </figure>
      );
    case "centered":
      return (
        <section className="flex justify-center px-4 py-12 sm:px-8">
          <FadeUp className="flex w-full max-w-[640px] flex-col gap-4">
            <h2 className="text-[clamp(26px,2.2vw,32px)] font-medium leading-[1.2] tracking-[-0.02em] text-ink">
              {block.heading}
            </h2>
            <p className="text-base font-medium leading-[1.45] text-body">{block.body}</p>
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
        {block.eyebrow && <p className="text-[13px] text-subtle">{block.eyebrow}</p>}
        <h2 className="text-[clamp(24px,2vw,28px)] font-medium leading-[1.2] tracking-[-0.02em] text-ink">{block.heading}</h2>
        {block.subheading && <p className="text-base font-medium leading-[1.5] text-body">{block.subheading}</p>}
      </FadeUp>

      <motion.div
        className="flex min-w-0 flex-1 flex-col gap-3.5"
        variants={stagger}
        initial={reduce ? "show" : "hide"}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {block.body?.map((p, i) => (
          <motion.p key={i} variants={item} className="text-base font-medium leading-[1.5] text-body">
            {p}
          </motion.p>
        ))}

        {block.points && <Points points={block.points} />}

        {block.groups?.map((g) => (
          <motion.div key={g.title} variants={item} className="flex flex-col gap-3.5 pt-2">
            <h3 className="text-[17px] font-medium text-ink">{g.title}</h3>
            <Points points={g.points} />
          </motion.div>
        ))}

        {block.findings?.map((f, i) => (
          <motion.div key={f.title} variants={item} className="flex gap-6 border-t border-surface py-4">
            <span className="text-sm font-medium" style={{ color: study.accent }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-1 flex-col gap-1">
              <p className="text-[17px] font-medium text-ink">{f.title}</p>
              <p className="text-[15px] font-medium leading-[1.45] text-body">{f.body}</p>
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
                <p className="text-[17px] font-medium text-ink">{l.title}</p>
                <p className="text-sm font-medium leading-[1.5] text-body">{l.body}</p>
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
                <p className="text-sm font-medium leading-[1.45] text-body">{s.label}</p>
              </motion.div>
            ))}
          </div>
        )}

        {block.link && (
          <motion.a
            variants={item}
            href={block.link.href}
            {...external(block.link.href)}
            className="w-fit text-[15px] font-medium text-body underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            {block.link.label}
          </motion.a>
        )}
      </motion.div>
    </section>
  );
}

function Points({ points }: { points: string[] }) {
  return (
    <>
      {points.map((p) => (
        <motion.div key={p} variants={item} className="flex items-start gap-3">
          <span aria-hidden className="mt-[9px] size-1.5 shrink-0 rounded-full bg-ink" />
          <p className="flex-1 text-[15px] font-medium leading-[1.5] text-ink">{p}</p>
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
        className="grid grid-cols-2 border-4 border-page sm:grid-cols-4 lg:grid-cols-8"
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
