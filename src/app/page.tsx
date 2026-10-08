import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { HeroVideo } from "@/components/sections/hero-video";
import { About } from "@/components/sections/about";
import { Works } from "@/components/sections/works";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <div id="top" />
      <Nav />
      <main>
        <Hero />
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
