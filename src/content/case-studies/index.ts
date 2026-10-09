import type { CaseStudy } from "./types";
import { soulsync } from "./soulsync";
import { spendive } from "./spendive";
import { freshline } from "./freshline";
import { cargotrace } from "./cargotrace";
import { fundora } from "./fundora";
import { hellomeMoney } from "./hellome-money";
import { hellomeTravel } from "./hellome-travel";

export const caseStudies: CaseStudy[] = [hellomeTravel, spendive, freshline, soulsync, hellomeMoney, fundora, cargotrace];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

/** Card image shown under "More Works". */
export function cardCover(slug: string) {
  return `/case-studies/covers/${slug}.jpg`;
}

export type { CaseStudy, Block } from "./types";
