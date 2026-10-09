import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/sections/nav";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { CaseHero, CaseOverview, MoreWorks } from "@/components/case-study/parts";
import { Blocks } from "@/components/case-study/blocks";
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

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-[1440px]">
        <CaseHero study={study} />
        <CaseOverview study={study} />
        <Blocks study={study} />
        <MoreWorks study={study} />
      </main>
      <Contact />
      <Footer />
    </>
  );
}
