import { Hero } from "@/components/sections/hero";
import { HeroVideo } from "@/components/sections/hero-video";
import { About } from "@/components/sections/about";
import { Works } from "@/components/sections/works";
import { Testimonials } from "@/components/sections/testimonials";
import { PhotoCursor } from "@/components/motion/photo-cursor";

// Nav and footer come from the root layout.
export default function Home() {
  return (
    <main>
      {/* Desktop only: Timi's photo trails the cursor over the hero, hiding over links and buttons. */}
      <PhotoCursor src="/images/timi.png">
        <Hero />
      </PhotoCursor>
      <HeroVideo />
      <About />
      <Works />
      <Testimonials />
    </main>
  );
}
