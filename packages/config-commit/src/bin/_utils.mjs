import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import process from "node:process";

const require = createRequire(import.meta.url);

export function fail(message, code = 1) {
  console.error(message);
  process.exit(code);
}

export function readStdin() {
  if (process.stdin.isTTY) {
    return "";
  }

  return readFileSync(0, "utf8");
}

export function resolvePackageBin(packageName, binName) {
  const packageJsonPath = require.resolve(`${packageName}/package.json`);
  const packageJson = require(packageJsonPath);
  const relativeBin =
    typeof packageJson.bin === "string"
      ? packageJson.bin
      : packageJson.bin?.[binName];

  if (!relativeBin) {
    fail(`Unable to resolve bin '${binName}' from package '${packageName}'.`);
  }

  return resolve(dirname(packageJsonPath), relativeBin);
}

export function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? process.cwd(),
    encoding: "utf8",
    env: {
      ...process.env,
      ...options.env,
    },
    input: options.input,
    stdio: options.capture ? ["pipe", "pipe", "pipe"] : "inherit",
  });

  if (result.error) {
    throw result.error;
  }

  if (options.check !== false && result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  return result;
}

export function runNodePackageBin(packageName, binName, args, options = {}) {
  return run(
    process.execPath,
    [resolvePackageBin(packageName, binName), ...args],
    options
  );
}

export function runGit(args, options = {}) {
  return run("git", args, options);
}

export function trimOutput(value) {
  return value?.trim() ?? "";
}
