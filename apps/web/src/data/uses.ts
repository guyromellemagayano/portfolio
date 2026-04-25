/**
 * @file apps/web/src/data/uses.ts
 * @author Guy Romelle Magayano
 * @description Uses page data stored as simple grouped records.
 */

export interface UseItem {
  name: string;
  summary: string;
  link?: {
    label: string;
    href: string;
    target?: "_blank" | "_self";
    rel?: string;
  };
}

export interface UseCategory {
  id: string;
  title: string;
  intro: string;
  items: UseItem[];
}

export const useCategories: UseCategory[] = [
  {
    id: "workstation",
    title: "Workstation",
    intro: "Hardware I use every day.",
    items: [
      {
        name: "16-inch MacBook Pro",
        summary: "My primary machine for engineering and design work.",
      },
      {
        name: "Apple Studio Display",
        summary: "Main display for coding and visual review tasks.",
      },
    ],
  },
  {
    id: "developer-tooling",
    title: "Developer tooling",
    intro: "Core tools in my build and delivery workflow.",
    items: [
      {
        name: "Astro + React",
        summary:
          "Static-first app foundation with React islands where the interface needs them.",
      },
      {
        name: "Playwright",
        summary: "Primary browser automation and end-to-end test tooling.",
      },
    ],
  },
  {
    id: "productivity",
    title: "Productivity",
    intro: "How I organize daily planning and notes.",
    items: [
      {
        name: "Notion",
        summary: "Roadmaps, planning docs, and weekly review workflows.",
      },
      {
        name: "Linear",
        summary: "Issue tracking and product delivery operations.",
      },
    ],
  },
  {
    id: "recording",
    title: "Recording",
    intro: "Tools for calls, demos, and content creation.",
    items: [
      {
        name: "Shure MV7",
        summary: "Mic for calls, workshops, and recordings.",
      },
      {
        name: "OBS Studio",
        summary: "Scene composition and recording for demos and talks.",
      },
    ],
  },
];
