/**
 * @file apps/jobs/src/app/layout.tsx
 * @author Guy Romelle Magayano
 * @description Root layout for the direct ATS jobs platform.
 */

import type { Metadata } from "next";

import { ActiveNav } from "@jobs/components/ActiveNav";
import { SyncControls } from "@jobs/components/SyncControls";

import "../styles/tailwind.css";

export const metadata: Metadata = {
  title: "Direct ATS Jobs",
  description:
    "Single-user local-first direct ATS search, source health, and application tracking.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.16),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#ffffff_45%,_#f4f4f5_100%)] font-sans text-zinc-950 antialiased">
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-5 py-8 lg:px-8">
          <header
            aria-label="Jobs platform header"
            className="grid gap-6 rounded-[2rem] border border-zinc-200/80 bg-white/80 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)] backdrop-blur"
            role="banner"
          >
            <div className="grid gap-3">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-700">
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
                <SyncControls />
              </div>
            </div>
            <ActiveNav />
          </header>
          <main aria-label="Jobs platform content" className="pb-10" role="main">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
