#!/usr/bin/env node
import { readStdin, runGit, runNodePackageBin, trimOutput } from "./_utils.mjs";

const ZERO_HASH = "0000000000000000000000000000000000000000";

function gitOutput(args, options = {}) {
  const result = runGit(args, {
    ...options,
    capture: true,
    check: options.check ?? false,
  });

  return trimOutput(result.stdout);
}

function hasRef(ref) {
  const result = runGit(["show-ref", "--verify", "--quiet", ref], {
    capture: true,
    check: false,
  });

  return result.status === 0;
}

function hasEmbeddedSignature(commitObject) {
  return commitObject.split("\n").some((line) => line.startsWith("gpgsig "));
}

function isSignedCommitWithLocalVerificationIssue(
  commitObject,
  signatureState
) {
  if (!["N", "E", "U"].includes(signatureState)) {
    return false;
  }

  return hasEmbeddedSignature(commitObject);
}

function getRangeForPush(localRef, localSha, remoteSha, remoteName) {
  if (remoteSha !== ZERO_HASH) {
    const range = `${remoteSha}..${localSha}`;
    return { range, rangeDebug: range };
  }

  const localBranch = localRef.replace(/^refs\/heads\//u, "");
  const trackingRef = `refs/remotes/${remoteName}/${localBranch}`;
  let baseRef = "";

  if (localBranch !== localRef && hasRef(trackingRef)) {
    baseRef = trackingRef;
  } else {
    const defaultRemoteRef = gitOutput([
      "symbolic-ref",
      "-q",
      `refs/remotes/${remoteName}/HEAD`,
    ]);

    if (defaultRemoteRef && hasRef(defaultRemoteRef)) {
      baseRef = defaultRemoteRef;
    }
  }

  let baseSha = "";
  if (baseRef) {
    const baseTipSha = gitOutput(["rev-parse", baseRef]);
    if (baseTipSha) {
      baseSha = gitOutput(["merge-base", baseTipSha, localSha]);
    }
  }

  if (baseSha) {
    const range = `${baseSha}..${localSha}`;
    return { range, rangeDebug: `${range} (base: ${baseRef})` };
  }

  if (baseRef) {
    return {
      range: localSha,
      rangeDebug: `${localSha} (fallback: no merge-base from ${baseRef})`,
    };
  }

  return {
    range: localSha,
    rangeDebug: `${localSha} (fallback: no remote base ref for ${remoteName})`,
  };
}

function getInvalidCommits(range) {
  const logOutput = gitOutput(["log", "--format=%H %G?", range]);
  const invalidCommits = [];

  for (const line of logOutput.split("\n")) {
    if (!line) {
      continue;
    }

    const [commitSha, signatureState = ""] = line.split(" ");
    const commitObject = gitOutput(["cat-file", "-p", commitSha]);

    if (signatureState === "G") {
      continue;
    }

    if (
      isSignedCommitWithLocalVerificationIssue(commitObject, signatureState)
    ) {
      console.warn(
        `Allowing signed commit with local verification status '${signatureState}': ${commitSha}`
      );
      continue;
    }

    invalidCommits.push(`${commitSha} (${signatureState})`);
  }

  return invalidCommits;
}

runNodePackageBin("validate-branch-name", "validate-branch-name", []);

const [remoteName = "origin"] = process.argv.slice(2);
const updates = readStdin()
  .split(/\r?\n/u)
  .map((line) => line.trim())
  .filter(Boolean);

let hasInvalidSignature = false;

for (const update of updates) {
  const [localRef, localSha, remoteRef = "", remoteSha = ZERO_HASH] =
    update.split(/\s+/u);

  if (!localRef || localSha === ZERO_HASH) {
    continue;
  }

  const { range, rangeDebug } = getRangeForPush(
    localRef,
    localSha,
    remoteSha,
    remoteName
  );
  const invalidCommits = getInvalidCommits(range);

  if (!invalidCommits.length) {
    continue;
  }

  console.error(
    `Push blocked: found unsigned or unverified commits for ${localRef} -> ${remoteRef}`
  );
  console.error(`Range checked: ${rangeDebug}`);
  console.error(invalidCommits.slice(0, 20).join("\n"));
  hasInvalidSignature = true;
}

if (hasInvalidSignature) {
  console.error("Sign and verify commits before pushing.");
  process.exit(1);
}
