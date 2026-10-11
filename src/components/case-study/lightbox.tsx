"use client";

import dynamic from "next/dynamic";
import { createContext, useContext, useMemo, useState } from "react";
import { useLenis } from "lenis/react";
import type { Img } from "@/content/case-studies/types";

// The viewer's code only loads the first time someone opens an image.
const Viewer = dynamic(() => import("./lightbox-viewer"), { ssr: false });

const LightboxContext = createContext<((src: string) => void) | null>(null);

/** Opens the full-screen viewer on the image with this `src`. */
export function useOpenImage() {
  return useContext(LightboxContext);
}

/**
 * Full-screen image viewer for a case study. Any image inside can be tapped to
 * open it; from there people can zoom (pinch, double-tap, scroll), pan, swipe
 * to the next image, and tap outside, pull down or press Escape to close.
 */
export function CaseLightbox({ images, children }: { images: Img[]; children: React.ReactNode }) {
  const [index, setIndex] = useState(-1);
  const [loaded, setLoaded] = useState(false);
  const lenis = useLenis();

  const open = useMemo(
    () => (src: string) => {
      const i = images.findIndex((img) => img.src === src);
      if (i < 0) return;
      lenis?.stop();
      setLoaded(true);
      setIndex(i);
    },
    [images, lenis],
  );

  const close = () => {
    lenis?.start();
    setIndex(-1);
  };

  return (
    <LightboxContext.Provider value={open}>
      {children}
      {loaded && <Viewer images={images} index={index} onClose={close} />}
    </LightboxContext.Provider>
  );
}
