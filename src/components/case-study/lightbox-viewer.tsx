"use client";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import type { Img } from "@/content/case-studies/types";

// Sizes the image optimizer is allowed to produce (Next's default device sizes).
const widths = [1080, 1920, 3840];

/** Optimised AVIF/WebP URL for `src` at width `w` (quality 90, as on the page). */
const optimised = (src: string, w: number) => `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=90`;

export default function LightboxViewer({
  images,
  index,
  onClose,
}: {
  images: Img[];
  index: number;
  onClose: () => void;
}) {
  return (
    <Lightbox
      open={index >= 0}
      index={Math.max(index, 0)}
      close={onClose}
      plugins={[Zoom]}
      slides={images.map((img) => {
        // Source files are 2x exports of the declared size.
        const full = { w: img.w * 2, h: img.h * 2 };
        return {
          src: optimised(img.src, 3840),
          alt: img.alt,
          width: full.w,
          height: full.h,
          srcSet: widths.map((w) => ({
            src: optimised(img.src, w),
            width: Math.min(w, full.w),
            height: Math.round((Math.min(w, full.w) * full.h) / full.w),
          })),
        };
      })}
      zoom={{ maxZoomPixelRatio: 2, scrollToZoom: true, doubleTapDelay: 300 }}
      controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
      carousel={{ finite: true, padding: "16px" }}
      animation={{ fade: 250, swipe: 400 }}
      styles={{ container: { backgroundColor: "#0a0a0a" } }}
    />
  );
}
