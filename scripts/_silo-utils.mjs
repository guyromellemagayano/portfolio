import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = execGit(["rev-parse", "--show-toplevel"]);

export function execGit(args, options = {}) {
  return execFileSync("git", args, {
    cwd: repoRoot,
    encoding: "utf8",
    ...options,
  }).trim();
}

export function loadManifest() {
  const manifestPath = path.join(repoRoot, "tooling", "repos.manifest.json");
  return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
}

export function parseGitmodules() {
  const gitmodulesPath = path.join(repoRoot, ".gitmodules");

  if (!fs.existsSync(gitmodulesPath)) {
    return new Map();
  }

  const raw = fs.readFileSync(gitmodulesPath, "utf8");
  const sections = raw
    .split(/\n(?=\[submodule )/)
    .map((entry) => entry.trim())
    .filter(Boolean);

  return new Map(
    sections.map((section) => {
      const [, header] = section.match(/^\[submodule "(.+)"\]/) ?? [];
      const values = Object.fromEntries(
        section
          .split("\n")
          .slice(1)
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => {
            const [key, ...rest] = line.split("=");
            return [key.trim(), rest.join("=").trim()];
          })
      );

      return [header, values];
    })
  );
}

export function normalizePath(value) {
  return value.replaceAll("\\", "/").replace(/\/+$/, "");
}

export function getGitIndexMode(targetPath) {
  const normalized = normalizePath(targetPath);

  try {
    const output = execGit(["ls-files", "--stage", "--", normalized]);
    const firstLine = output.split("\n")[0] ?? "";

    if (!firstLine) {
      return null;
    }

    return firstLine.split(/\s+/)[0] ?? null;
  } catch {
    return null;
  }
}

export function isGitlink(targetPath) {
  return getGitIndexMode(targetPath) === "160000";
}

export function ensureRepoRoot() {
  process.chdir(repoRoot);
  return repoRoot;
}

export function findSiloBySelector(selector, manifest = loadManifest()) {
  const normalized = normalizePath(selector);

  return manifest.submodules.find((silo) => {
    return [
      silo.id,
      silo.path,
      silo.repoName,
      silo.workspacePackageName,
      silo.logicalName,
    ]
      .filter(Boolean)
      .map((value) => normalizePath(String(value)))
      .includes(normalized);
  });
}

export { repoRoot };
