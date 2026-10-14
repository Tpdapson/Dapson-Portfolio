import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseHero, CaseOverview, MoreWorks } from "@/components/case-study/parts";
import { Blocks } from "@/components/case-study/blocks";
import { CaseLightbox } from "@/components/case-study/lightbox";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { absolute, JsonLd, personSchema, siteUrl } from "@/content/seo";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  const title = `${study.name} case study — Timilehin Oladapo, Product Designer`;
  const description = `${study.tagline}. ${study.overview.body}`.slice(0, 300);
  const url = `/work/${study.slug}`;
  return {
    title: `${study.name} — Timilehin Oladapo`,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", siteName: "Timilehin Oladapo", images: [{ url: "/opengraph-image.jpg?v=2", width: 1200, height: 630, alt: "Dapson, Product Designer: I design and build digital products that look good and work even better." }] },
    twitter: { card: "summary_large_image", title, description, creator: "@tp_dapson", images: ["/twitter-image.jpg?v=2"] },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  // Every image on the page, in reading order, for the full-screen viewer.
  const images = [
    study.hero,
    ...study.blocks.flatMap((b) => (b.type === "image" ? [b] : b.type === "pair" ? b.images : [])),
  ];

  return (
    <main className="mx-auto max-w-[1440px]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "@id": `${siteUrl}/work/${study.slug}#work`,
          name: `${study.name} case study`,
          headline: study.tagline,
          description: study.overview.body,
          url: `${siteUrl}/work/${study.slug}`,
          image: absolute(study.hero.src),
          genre: "Product design case study",
          keywords: study.overview.meta.map(([, value]) => value).join(", "),
          author: personSchema(),
          creator: { "@id": `${siteUrl}/#person` },
        }}
      />
      <CaseLightbox images={images}>
        <CaseHero study={study} />
        <CaseOverview study={study} />
        <Blocks study={study} />
      </CaseLightbox>
      <MoreWorks study={study} />
    </main>
  );
}
