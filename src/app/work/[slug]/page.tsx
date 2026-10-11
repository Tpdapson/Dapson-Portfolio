import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseHero, CaseOverview, MoreWorks } from "@/components/case-study/parts";
import { Blocks } from "@/components/case-study/blocks";
import { CaseLightbox } from "@/components/case-study/lightbox";
import { caseStudies, getCaseStudy } from "@/content/case-studies";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return { title: `${study.name} — Dapson`, description: study.tagline };
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
      <CaseLightbox images={images}>
        <CaseHero study={study} />
        <CaseOverview study={study} />
        <Blocks study={study} />
      </CaseLightbox>
      <MoreWorks study={study} />
    </main>
  );
}
