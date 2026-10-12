import type { CaseStudy } from "./types";
import { soulsync } from "./soulsync";
import { spendive } from "./spendive";
import { freshline } from "./freshline";
import { cargotrace } from "./cargotrace";
import { fundora } from "./fundora";
import { hellomeMoney } from "./hellome-money";
import { hellomeTravel } from "./hellome-travel";
import { digitalclan } from "./digitalclan";

export const caseStudies: CaseStudy[] = [digitalclan, hellomeTravel, spendive, freshline, soulsync, hellomeMoney, fundora, cargotrace];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export type { CaseStudy, Block } from "./types";
