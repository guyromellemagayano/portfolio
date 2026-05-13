/**
 * @file apps/web/src/data/projects.ts
 * @author Guy Romelle Magayano
 * @description Project and product-surface data parsed from local JSON records.
 */

import rawProjectsDataJson from "@web/data/projects.json";
import {
  assertExactKeys,
  assertUniqueValues,
  expectArray,
  expectEnum,
  expectHref,
  expectOptionalBoolean,
  expectOptionalString,
  expectRecord,
  expectString,
  expectStringArray,
} from "@web/lib/json-data";

const PROJECT_KINDS = ["work", "lab"] as const;
const LINK_TARGETS = ["_blank", "_self"] as const;

type ProjectKind = (typeof PROJECT_KINDS)[number];
type ProjectLinkTarget = (typeof LINK_TARGETS)[number];

export interface ProjectLink {
  label: string;
  href: string;
  target?: ProjectLinkTarget;
  rel?: string;
}

export interface ProjectCaseStudy {
  problem: string;
  role: string;
  decisions: string[];
  outcome: string;
  proof: string[];
}

export interface Project {
  id: string;
  slug: string;
  kind: ProjectKind;
  title: string;
  path: string;
  description: string;
  bullets: string[];
  caseStudy: ProjectCaseStudy;
  tags: string[];
  website?: ProjectLink;
  repository?: ProjectLink;
  featured?: boolean;
}

type ProjectsData = {
  projects: Project[];
};

const PROJECTS_DATA_KEYS = ["projects"] as const;
const PROJECT_KEYS = [
  "id",
  "slug",
  "kind",
  "title",
  "path",
  "description",
  "bullets",
  "caseStudy",
  "tags",
  "website",
  "repository",
  "featured",
] as const;
const PROJECT_CASE_STUDY_KEYS = [
  "problem",
  "role",
  "decisions",
  "outcome",
  "proof",
] as const;
const PROJECT_LINK_KEYS = ["label", "href", "target", "rel"] as const;

function expectSlug(value: unknown, path: string): string {
  const slug = expectString(value, path);

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(
      `Invalid local data at "${path}": expected kebab-case slug.`
    );
  }

  return slug;
}

function parseProjectLink(value: unknown, path: string): ProjectLink {
  const record = expectRecord(value, path);

  assertExactKeys(record, PROJECT_LINK_KEYS, path);

  const href = expectHref(record.href, `${path}.href`);
  const target =
    typeof record.target === "undefined"
      ? undefined
      : expectEnum(record.target, LINK_TARGETS, `${path}.target`);
  const rel = expectOptionalString(record.rel, `${path}.rel`);

  if (target === "_blank") {
    const relTokens = new Set((rel ?? "").split(/\s+/).filter(Boolean));

    if (!relTokens.has("noopener") || !relTokens.has("noreferrer")) {
      throw new Error(
        `Invalid local data at "${path}.rel": links with \`target="_blank"\` must include both \`noopener\` and \`noreferrer\`.`
      );
    }
  }

  return {
    label: expectString(record.label, `${path}.label`),
    href,
    target,
    rel,
  };
}

function parseProjectCaseStudy(value: unknown, path: string): ProjectCaseStudy {
  const record = expectRecord(value, path);

  assertExactKeys(record, PROJECT_CASE_STUDY_KEYS, path);

  return {
    problem: expectString(record.problem, `${path}.problem`),
    role: expectString(record.role, `${path}.role`),
    decisions: expectStringArray(record.decisions, `${path}.decisions`),
    outcome: expectString(record.outcome, `${path}.outcome`),
    proof: expectStringArray(record.proof, `${path}.proof`),
  };
}

function parseProject(value: unknown, path: string): Project {
  const record = expectRecord(value, path);

  assertExactKeys(record, PROJECT_KEYS, path);

  return {
    id: expectSlug(record.id, `${path}.id`),
    slug: expectSlug(record.slug, `${path}.slug`),
    kind: expectEnum(record.kind, PROJECT_KINDS, `${path}.kind`),
    title: expectString(record.title, `${path}.title`),
    path: expectString(record.path, `${path}.path`),
    description: expectString(record.description, `${path}.description`),
    bullets: expectStringArray(record.bullets, `${path}.bullets`),
    caseStudy: parseProjectCaseStudy(record.caseStudy, `${path}.caseStudy`),
    tags: expectStringArray(record.tags, `${path}.tags`),
    website:
      typeof record.website === "undefined"
        ? undefined
        : parseProjectLink(record.website, `${path}.website`),
    repository:
      typeof record.repository === "undefined"
        ? undefined
        : parseProjectLink(record.repository, `${path}.repository`),
    featured: expectOptionalBoolean(record.featured, `${path}.featured`),
  };
}

function createProjectsData(value: unknown): ProjectsData {
  const path = "data/projects.json";
  const record = expectRecord(value, path);

  assertExactKeys(record, PROJECTS_DATA_KEYS, path);

  const projects = expectArray(record.projects, `${path}.projects`).map(
    (entry, index) => parseProject(entry, `${path}.projects[${index}]`)
  );

  assertUniqueValues(
    projects.map((project) => project.id),
    "project id",
    `${path}.projects`
  );
  assertUniqueValues(
    projects.map((project) => project.slug),
    "project slug",
    `${path}.projects`
  );

  return { projects };
}

const projectsData = createProjectsData(rawProjectsDataJson as unknown);

export const projects: Project[] = projectsData.projects;

export const workProjects = projects.filter(
  (project) => project.kind === "work"
);

export const labProjects = projects.filter((project) => project.kind === "lab");

export function getProjectPath(project: Project): string {
  return `/${project.kind === "lab" ? "labs" : "work"}/${project.slug}`;
}
