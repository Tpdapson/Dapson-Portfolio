# Dapson Portfolio

Next.js (App Router) + Tailwind v4 + Motion, with Lenis smooth scroll and a matter-js skill pile in the footer.

```sh
npm install
npm run dev   # http://localhost:3000
```

## Where things live

- `src/content/site.ts`: projects, testimonials and links (Book a call, email, résumé, socials). Edit copy here.
- `src/components/sections/`: one file per home-page section, in Figma order.
- `src/components/motion/`: reusable motion pieces (mask line reveals, blur-in words, scroll-filled text, draggable stickers, magnetic buttons, smooth scroll).
- `src/app/globals.css`: design tokens taken from the Figma variables.
- `src/fonts/`: PP Neue Montreal Book and Medium (licensed from Pangram Pangram), loaded with `next/font/local`.

## Motion

Nothing waits behind a loader. The hero types in on load, and everything else plays as it scrolls into view:

| Section | Motion |
| --- | --- |
| Hero | Headline lines slide up out of a mask, the statement blurs in word by word, the CTAs follow; buttons are magnetic |
| Showreel | Grows from an inset card to full width as you scroll, with a slight parallax; it only plays while on screen |
| About | Stickers spring in and can be dragged; the intro sentence fills in word by word as you scroll |
| Section titles | Handwritten note wobbles in and its underline draws; the big title rises out of a mask |
| Work | Number, rule and name stagger in; the cover opens from an inset clip with an image parallax; a "view" cursor follows the mouse |
| Testimonials | Each message shows a typing indicator, then the bubble pops in from its corner |
| Footer | Skill pills drop in and pile up (matter-js); you can grab and throw them with a mouse |

Everything respects `prefers-reduced-motion`.

## Assets

Images in `public/images/` were exported from the Figma file at 1x. The covers are 1360×800 JPEGs. Your photo (150px), the presenting photo used as the "cherub" sticker and the testimonial avatars are small. Replace any of them with higher-resolution files under the same names whenever you like.
