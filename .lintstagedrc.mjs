import path from "node:path";

const WORKSPACE_ROOTS = new Set(["apps", "packages"]);

function normalizePath(file) {
  return file.split(path.sep).join("/");
}

function quote(value) {
  return JSON.stringify(value);
}

function getWorkspaceDir(file) {
  const normalized = normalizePath(file);
  const [root, name] = normalized.split("/");
  if (!WORKSPACE_ROOTS.has(root) || !name) return null;
  return `${root}/${name}`;
}

function buildWorkspaceLintCommands(filenames) {
  const filesByWorkspace = new Map();

  for (const file of filenames) {
    const workspaceDir = getWorkspaceDir(file);
    if (!workspaceDir) continue;

    const relativePath = normalizePath(path.relative(workspaceDir, file));
    if (relativePath.startsWith("..")) continue;

    const currentFiles = filesByWorkspace.get(workspaceDir) ?? [];
    currentFiles.push(relativePath);
    filesByWorkspace.set(workspaceDir, currentFiles);
  }

  return Array.from(filesByWorkspace.entries()).map(([workspaceDir, files]) => {
    const fileArgs = files.map(quote).join(" ");
    return `pnpm --dir ${quote(workspaceDir)} exec eslint --fix ${fileArgs}`;
  });
}

function buildPrettierCommand(filenames) {
  if (!filenames.length) return [];
  const fileArgs = filenames.map(quote).join(" ");
  return [`prettier --write ${fileArgs}`];
}

function lintAndFormatWorkspaceFiles(filenames) {
  return [
    ...buildWorkspaceLintCommands(filenames),
    ...buildPrettierCommand(filenames),
  ];
}

/** @type {import("lint-staged").Configuration} */
const config = {
  "{apps,packages}/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}":
    lintAndFormatWorkspaceFiles,
  "{apps,packages}/**/*.{css,scss}": ["stylelint --fix", "prettier --write"],
  "*.{js,mjs,cjs}": ["prettier --write"],
  "*.{json,jsonc}": ["prettier --write"],
  "*.{yaml,yml}": ["prettier --write"],
  "*.md": ["prettier --write"],
  "*.py": ["ruff check --fix", "ruff format"],
  "**/package.json": ["sort-package-json", "prettier --write"],
};

export default config;
