/**
 * @file apps/web/src/data/certifications.ts
 * @author Guy Romelle Magayano
 * @description Certification-style proof points presented with about content.
 */

export interface Certification {
  name: string;
  earned: boolean;
  variant: "yellow" | "white";
  category: "architecture" | "frontend" | "platform";
}

export const certifications: Certification[] = [
  {
    name: "Frontend Architecture",
    earned: true,
    variant: "yellow",
    category: "frontend",
  },
  {
    name: "Design Systems",
    earned: true,
    variant: "white",
    category: "frontend",
  },
  {
    name: "Platform Engineering",
    earned: true,
    variant: "yellow",
    category: "platform",
  },
  {
    name: "Content Modeling",
    earned: true,
    variant: "white",
    category: "architecture",
  },
];

export const earnedCertificationCount = certifications.filter(
  (certification) => certification.earned
).length;
export const totalCertificationCount = certifications.length;
