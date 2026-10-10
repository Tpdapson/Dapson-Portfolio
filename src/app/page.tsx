import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { HeroVideo } from "@/components/sections/hero-video";
import { About } from "@/components/sections/about";
import { Works } from "@/components/sections/works";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { PhotoCursor } from "@/components/motion/photo-cursor";

export default function Home() {
  return (
    <>
      <div id="top" />
      <main>
        {/* Desktop only: Timi's photo trails the cursor over the hero, hiding over links and buttons. */}
        <PhotoCursor src="/images/timi.png">
          <Nav />
          <Hero />
        </PhotoCursor>
        <HeroVideo />
        <About />
        <Works />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
