/**
 * @file apps/web/src/data/clients.ts
 * @author Guy Romelle Magayano
 * @description Client and work-history data presented on the portfolio.
 */

export interface Client {
  name: string;
  url?: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  summary: string;
}

export const clients: Client[] = [
  { name: "Frontend architecture" },
  { name: "Design systems" },
  { name: "Product platforms" },
  { name: "Content workflows" },
];

export const workExperience: WorkExperience[] = [
  {
    company: "Planetaria",
    role: "CEO",
    startDate: "2019-01-01",
    current: true,
    summary: "Leading product strategy, engineering direction, and operations.",
  },
  {
    company: "Airbnb",
    role: "Product Engineer",
    startDate: "2016-01-01",
    endDate: "2019-01-01",
    summary:
      "Worked on product systems and reusable frontend patterns for marketplace surfaces.",
  },
  {
    company: "Facebook",
    role: "Frontend Engineer",
    startDate: "2014-01-01",
    endDate: "2016-01-01",
    summary:
      "Built interface systems for high-traffic product experiences and internal tooling.",
  },
  {
    company: "Starbucks",
    role: "Software Engineer",
    startDate: "2012-01-01",
    endDate: "2014-01-01",
    summary:
      "Shipped customer-facing and operational web experiences across retail workflows.",
  },
];
