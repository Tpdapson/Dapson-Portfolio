"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { FadeUp, MaskLines, Sticker } from "@/components/motion/primitives";
import { SectionTitle } from "@/components/sections/section-title";
import { external } from "@/content/site";
import { shipped, shots, type ShippedProject, type Shot } from "@/content/playground";

/** The /playground page: explorations and concepts, then products built and shipped. */
export function Playground() {
  return (
    <main>
      <Hero />

      <section aria-label="Design explorations" className="px-4 pb-16 pt-6 sm:px-8 sm:pt-10 lg:pb-20">
        <ul className="mx-auto grid max-w-[1376px] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8">
          {shots.map((shot, i) => (
            <li key={shot.src}>
              <FadeUp delay={(i % 2) * 0.08} y={32}>
                <ShotCard shot={shot} priority={i < 2} />
              </FadeUp>
            </li>
          ))}
        </ul>
      </section>

      <Shipped />
    </main>
  );
}

/**
 * Built & Shipped. Over a project image, a "Visit site" label follows the
 * mouse, the same as the Selected Works covers on the home page.
 */
function Shipped() {
  const [label, setLabel] = useState<string | null>(null);
  // Clear it if the page is set aside mid-hover, so it never comes back stuck on.
  useEffect(() => () => setLabel(null), []);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  return (
      <section
        id="shipped"
        className="pb-[70px] lg:pb-[120px]"
        onPointerMove={(e) => {
          x.set(e.clientX);
          y.set(e.clientY);
        }}
      >
        <SectionTitle note="Built for Fun" lines={["BUILT & SHIPPED"]} />
        <FadeUp className="mx-auto -mt-4 max-w-[486px] px-4 text-center">
          <p className="text-lg leading-[1.4] text-body sm:text-xl">
            Products I built end to end with AI-powered tools. They&apos;re live, so go ahead and try them yourself.
          </p>
        </FadeUp>
        <ul className="mx-auto mt-10 grid max-w-[1440px] grid-cols-1 gap-10 px-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 sm:px-8 lg:gap-8">
          {shipped.map((p, i) => (
            <li key={p.href}>
              <FadeUp delay={i * 0.08} y={32}>
                <ShippedCard project={p} onShow={() => setLabel("Visit site")} onHide={() => setLabel(null)} />
              </FadeUp>
            </li>
          ))}
        </ul>

        {/* Follower label (mouse only). */}
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-50 hidden [@media(pointer:fine)]:block"
          style={{ x: sx, y: sy }}
        >
          <AnimatePresence>
            {label && (
              <motion.div
                key="cursor"
                className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-ink-2 px-4 py-2.5 text-sm font-medium text-on-ink"
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.3, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 26 }}
              >
                {label}
                <ArrowUpRight size={14} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
  );
}

function Hero() {
  return (
    <section className="flex flex-col items-center px-4 pb-10 pt-6 text-center sm:px-8 lg:pb-14">
      <h1 className="text-[clamp(56px,9.72vw,140px)] font-medium leading-none tracking-[-0.01em] text-title">
        <MaskLines lines={["PLAYGROUND"]} onMount delay={0.1} />
      </h1>
      <FadeUp onMount delay={0.35} y={12} className="mt-4 max-w-[486px] sm:mt-6">
        <p className="text-lg leading-[1.3] text-body sm:text-2xl">
          A space for the work I do for fun: explorations, concepts and the occasional happy accident.
        </p>
      </FadeUp>

      {/* Three tilted desk photos, as in Figma; drag them around. */}
      <div className="relative mt-6 aspect-[540/262] w-full max-w-[340px] sm:mt-8 sm:max-w-[540px]">
        <Sticker onMount delay={0.5} className="absolute left-0 top-[16%] w-[21.2%]">
          <Photo src="/playground/photo-left.webp" w={343} h={424} />
        </Sticker>
        <Sticker onMount delay={0.6} className="absolute right-0 top-[9%] w-[21.6%]">
          <Photo src="/playground/photo-right.webp" w={349} h={428} />
        </Sticker>
        <Sticker onMount delay={0.4} className="absolute left-1/2 top-0 z-10 w-[45%] -translate-x-1/2">
          <Photo src="/playground/photo-center.webp" w={728} h={768} />
        </Sticker>
      </div>
    </section>
  );
}

function Photo({ src, w, h }: { src: string; w: number; h: number }) {
  return (
    <Image
      src={src}
      width={w}
      height={h}
      alt=""
      priority
      draggable={false}
      sizes="250px"
      className="pointer-events-none block h-auto w-full"
    />
  );
}

/** A design shot; the image eases in a little closer on hover. */
function ShotCard({ shot, priority }: { shot: Shot; priority?: boolean }) {
  return (
    <figure className="group m-0 overflow-hidden bg-surface">
      <Image
        src={shot.src}
        width={1344}
        height={1000}
        alt={shot.alt}
        priority={priority}
        quality={90}
        sizes="(min-width: 1440px) 672px, (min-width: 640px) 50vw, 100vw"
        className="block h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] motion-reduce:transition-none"
      />
    </figure>
  );
}

/** A live product: the whole card opens the site in a new tab. */
function ShippedCard({ project, onShow, onHide }: { project: ShippedProject; onShow: () => void; onHide: () => void }) {
  return (
    <a
      href={project.href}
      {...external(project.href)}
      aria-label={`${project.name}: ${project.description} Opens the live site.`}
      className="group flex flex-col gap-5 sm:gap-6"
      onClick={onHide}
    >
      <div
        className="relative overflow-hidden bg-surface"
        onPointerEnter={(e) => e.pointerType === "mouse" && onShow()}
        onPointerLeave={onHide}
      >
        <Image
          src={project.image}
          width={1344}
          height={1000}
          alt=""
          quality={90}
          sizes="(min-width: 1440px) 672px, (min-width: 640px) 50vw, 100vw"
          className="block h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] motion-reduce:transition-none"
        />
      </div>
      <div className="flex flex-col gap-3 sm:max-w-[491px]">
        <h3 className="text-[22px] font-medium leading-none text-ink">{project.name}</h3>
        <p className="text-[15px] font-medium leading-[1.4] text-body">{project.description}</p>
      </div>
    </a>
  );
}
