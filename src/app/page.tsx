import { Hero } from "@/components/sections/hero";
import { HeroVideo } from "@/components/sections/hero-video";
import { About } from "@/components/sections/about";
import { Works } from "@/components/sections/works";
import { Testimonials } from "@/components/sections/testimonials";
import { PinANote } from "@/components/sections/pin-a-note";

// Nav and footer come from the root layout.
export default function Home() {
  return (
    <main>
      <Hero />
      <HeroVideo />
      <About />
      <Works />
      <Testimonials />
      <PinANote />
    </main>
  );
}
