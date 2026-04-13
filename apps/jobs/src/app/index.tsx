/**
 * @file apps/jobs/src/app/index.tsx
 * @author Guy Romelle Magayano
 * @description Vite-powered jobs platform shell and route composition.
 */

import { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router";

import { ActiveNav } from "@jobs/components/ActiveNav";
import { SyncControls } from "@jobs/components/SyncControls";
import { JobDetailPage } from "@jobs/pages/JobDetailPage";
import { JobsDashboardPage } from "@jobs/pages/JobsDashboardPage";
import { SettingsPage } from "@jobs/pages/SettingsPage";
import { SourcesPage } from "@jobs/pages/SourcesPage";
import { TrackerPage } from "@jobs/pages/TrackerPage";

const PAGE_TITLES: Record<string, string> = {
  "/": "Direct ATS Jobs",
  "/settings": "Settings · Direct ATS Jobs",
  "/sources": "Sources · Direct ATS Jobs",
  "/tracker": "Tracker · Direct ATS Jobs",
};

/** Applies per-route document titles inside the SPA shell. */
function DocumentTitleSync() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/jobs/")) {
      document.title = "Job Detail · Direct ATS Jobs";
      return;
    }

    document.title = PAGE_TITLES[location.pathname] ?? "Direct ATS Jobs";
  }, [location.pathname]);

  return null;
}

/** Renders the routed jobs application inside the shared app shell. */
function JobsApplicationShell() {
  const [refreshToken, setRefreshToken] = useState(0);
  const refreshHandlers = useMemo(
    () => ({
      refreshToken,
      requestRefresh: () => setRefreshToken((value) => value + 1),
    }),
    [refreshToken]
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.16),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#ffffff_45%,_#f4f4f5_100%)] font-sans text-zinc-950 antialiased">
      <DocumentTitleSync />
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-5 py-8 lg:px-8">
        <header
          aria-label="Jobs platform header"
          className="grid gap-6 rounded-[2rem] border border-zinc-200/80 bg-white/80 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)] backdrop-blur"
          role="banner"
        >
          <div className="grid gap-3">
            <p className="text-xs tracking-[0.3em] text-amber-700 uppercase">
              Direct ATS intelligence
            </p>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 lg:text-5xl">
                  Cut out the middleman. Pull the boards directly.
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 lg:text-base">
                  This bounded context is built for one serious operator:
                  discover company-owned ATS sources, validate them, keep the
                  feed fresh, and run your own saved/applied workflow locally.
                </p>
              </div>
              <SyncControls onCompleted={refreshHandlers.requestRefresh} />
            </div>
          </div>
          <ActiveNav />
        </header>
        <main aria-label="Jobs platform content" className="pb-10" role="main">
          <Routes>
            <Route
              element={
                <JobsDashboardPage
                  onRefreshRequested={refreshHandlers.requestRefresh}
                  refreshToken={refreshHandlers.refreshToken}
                />
              }
              path="/"
            />
            <Route
              element={
                <JobDetailPage
                  onRefreshRequested={refreshHandlers.requestRefresh}
                  refreshToken={refreshHandlers.refreshToken}
                />
              }
              path="/jobs/:id"
            />
            <Route
              element={
                <TrackerPage
                  onRefreshRequested={refreshHandlers.requestRefresh}
                  refreshToken={refreshHandlers.refreshToken}
                />
              }
              path="/tracker"
            />
            <Route
              element={
                <SourcesPage refreshToken={refreshHandlers.refreshToken} />
              }
              path="/sources"
            />
            <Route
              element={
                <SettingsPage
                  onRefreshRequested={refreshHandlers.requestRefresh}
                  refreshToken={refreshHandlers.refreshToken}
                />
              }
              path="/settings"
            />
            <Route element={<Navigate replace to="/" />} path="*" />
          </Routes>
        </main>
      </div>
    </div>
  );
}

const App = function App() {
  return (
    <BrowserRouter>
      <JobsApplicationShell />
    </BrowserRouter>
  );
};

export default App;
