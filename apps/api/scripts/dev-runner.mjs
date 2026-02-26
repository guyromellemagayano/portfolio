import { spawn } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import path from "node:path";

const projectRoot = globalThis?.process?.cwd();
const distEntryFile = path.join(projectRoot, "dist/index.js");
const restartDebounceMs = 200;
const distPollIntervalMs = 300;
const forceKillTimeoutMs = 3_000;

let buildWatcherProcess = null;
let runtimeProcess = null;
let shutdownRequested = false;
let runtimeRestartRequested = false;
let runtimeRestartInProgress = false;
let restartTimer = null;
let lastDistSignature = null;
let distPollTimer = null;

function log(message, metadata) {
  if (metadata) {
    console.log(`[api.dev] ${message}`, metadata);
    return;
  }

  console.log(`[api.dev] ${message}`);
}

function getDistSignature() {
  if (!existsSync(distEntryFile)) {
    return null;
  }

  const stats = statSync(distEntryFile);
  return `${stats.mtimeMs}:${stats.size}`;
}

function spawnProcess(command, args, options = {}) {
  return spawn(command, args, {
    cwd: projectRoot,
    stdio: "inherit",
    ...options,
  });
}

function runInitialBuild() {
  return new Promise((resolve, reject) => {
    log("Running initial API build");

    const buildProcess = spawnProcess("pnpm", ["exec", "bunchee"]);

    buildProcess.on("exit", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(
        new Error(
          `Initial build failed (code=${code ?? "null"}, signal=${signal ?? "null"})`
        )
      );
    });

    buildProcess.on("error", reject);
  });
}

function startBuildWatcher() {
  if (buildWatcherProcess) {
    return;
  }

  log("Starting bunchee watch");
  buildWatcherProcess = spawnProcess("pnpm", ["exec", "bunchee", "--watch"]);

  buildWatcherProcess.on("exit", (code, signal) => {
    buildWatcherProcess = null;

    if (shutdownRequested) {
      return;
    }

    log("Build watcher exited unexpectedly", {
      code,
      signal,
    });

    process.exitCode = 1;
    requestShutdown();
  });

  buildWatcherProcess.on("error", (error) => {
    log("Build watcher failed to start", {
      error: error instanceof Error ? error.message : String(error),
    });

    process.exitCode = 1;
    requestShutdown();
  });
}

function startRuntimeProcess() {
  if (shutdownRequested) {
    return;
  }

  log("Starting API runtime");
  runtimeProcess = spawnProcess(process.execPath, ["dist/index.js"]);

  runtimeProcess.on("exit", (code, signal) => {
    const wasRestart = runtimeRestartInProgress;

    runtimeProcess = null;
    runtimeRestartInProgress = false;

    if (shutdownRequested) {
      return;
    }

    if (wasRestart) {
      startRuntimeProcess();
      return;
    }

    log("API runtime exited", {
      code,
      signal,
    });

    scheduleRuntimeRestart("runtime process exited unexpectedly");
  });

  runtimeProcess.on("error", (error) => {
    log("API runtime failed to start", {
      error: error instanceof Error ? error.message : String(error),
    });

    process.exitCode = 1;
    requestShutdown();
  });
}

function restartRuntime(reason) {
  if (shutdownRequested) {
    return;
  }

  const nextSignature = getDistSignature();

  if (!nextSignature) {
    return;
  }

  lastDistSignature = nextSignature;

  if (!runtimeProcess) {
    log("Starting API runtime after build update", {
      reason,
    });
    startRuntimeProcess();
    return;
  }

  log("Restarting API runtime", {
    reason,
  });

  runtimeRestartInProgress = true;

  const runtimeToStop = runtimeProcess;
  const forceKillTimer = setTimeout(() => {
    if (!runtimeToStop.killed) {
      runtimeToStop.kill("SIGKILL");
    }
  }, forceKillTimeoutMs);

  runtimeToStop.once("exit", () => {
    clearTimeout(forceKillTimer);

    if (runtimeRestartRequested) {
      runtimeRestartRequested = false;
      scheduleRuntimeRestart("queued-dist-update");
    }
  });

  runtimeToStop.kill("SIGTERM");
}

function scheduleRuntimeRestart(reason) {
  if (shutdownRequested) {
    return;
  }

  if (runtimeRestartInProgress) {
    runtimeRestartRequested = true;
    return;
  }

  if (restartTimer) {
    globalThis?.clearTimeout(restartTimer);
  }

  restartTimer = setTimeout(() => {
    restartTimer = null;
    restartRuntime(reason);
  }, restartDebounceMs);
}

function startDistPolling() {
  lastDistSignature = getDistSignature();

  distPollTimer = setInterval(() => {
    const currentSignature = getDistSignature();

    if (!currentSignature || currentSignature === lastDistSignature) {
      return;
    }

    scheduleRuntimeRestart("dist/index.js changed");
  }, distPollIntervalMs);
}

function requestShutdown() {
  if (shutdownRequested) {
    return;
  }

  shutdownRequested = true;

  if (restartTimer) {
    clearTimeout(restartTimer);
    restartTimer = null;
  }

  if (distPollTimer) {
    clearInterval(distPollTimer);
    distPollTimer = null;
  }

  if (runtimeProcess && !runtimeProcess.killed) {
    runtimeProcess.kill("SIGTERM");
  }

  if (buildWatcherProcess && !buildWatcherProcess.killed) {
    buildWatcherProcess.kill("SIGTERM");
  }

  setTimeout(() => {
    if (runtimeProcess && !runtimeProcess.killed) {
      runtimeProcess.kill("SIGKILL");
    }

    if (buildWatcherProcess && !buildWatcherProcess.killed) {
      buildWatcherProcess.kill("SIGKILL");
    }
  }, forceKillTimeoutMs);
}

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    requestShutdown();
  });
}

async function main() {
  await runInitialBuild();
  startBuildWatcher();
  startDistPolling();
  startRuntimeProcess();
}

main().catch((error) => {
  log("API dev runner failed", {
    error: error instanceof Error ? error.message : String(error),
  });
  process.exit(1);
});
