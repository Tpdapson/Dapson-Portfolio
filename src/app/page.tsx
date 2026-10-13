import { Hero } from "@/components/sections/hero";
import { HeroVideo } from "@/components/sections/hero-video";
import { About } from "@/components/sections/about";
import { Works } from "@/components/sections/works";
import { Testimonials } from "@/components/sections/testimonials";
import { JsonLd, person, personSchema, seoDescription, siteUrl } from "@/content/seo";
import { PinANote } from "@/components/sections/pin-a-note";

// Nav and footer come from the root layout.
export default function Home() {
  return (
    <main>
      {/* Tells search engines and AI assistants who this site is about. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            personSchema(),
            { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: person.name, publisher: { "@id": `${siteUrl}/#person` } },
            {
              "@type": "ProfilePage",
              "@id": `${siteUrl}/#profile`,
              url: siteUrl,
              name: `${person.name} — ${person.jobTitle}`,
              description: seoDescription,
              mainEntity: { "@id": `${siteUrl}/#person` },
              isPartOf: { "@id": `${siteUrl}/#website` },
            },
          ],
        }}
      />
      <Hero />
      <HeroVideo />
      <About />
      <Works />
      <Testimonials />
      <PinANote />
    </main>
  );
}
