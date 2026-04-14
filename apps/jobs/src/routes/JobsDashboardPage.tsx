/**
 * @file apps/jobs/src/routes/JobsDashboardPage.tsx
 * @author Guy Romelle Magayano
 * @description Search dashboard page for normalized direct ATS listings.
 */

import { type FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { JobCard } from "@jobs/components/JobCard";
import { Button } from "@jobs/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@jobs/components/ui/card";
import { Input } from "@jobs/components/ui/input";
import { fetchJobs, fetchSyncStatus } from "@jobs/lib/api";

import type {
  JobSearchResponseData,
  JobSyncRunSummary,
} from "@portfolio/api-contracts";

type JobsDashboardPageProps = {
  onRefreshRequested: () => void;
  refreshToken: number;
};

function parseDelimitedValue(value: FormDataEntryValue | null): string[] {
  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function createSearchParamsFromForm(form: HTMLFormElement): URLSearchParams {
  const formData = new FormData(form);
  const nextSearchParams = new URLSearchParams();
  const keyword = formData.get("keyword");
  const company = formData.get("company");
  const location = formData.get("location");
  const freshWithinHours = formData.get("freshWithinHours");

  if (typeof keyword === "string" && keyword.trim()) {
    nextSearchParams.set("keyword", keyword.trim());
  }

  if (typeof company === "string" && company.trim()) {
    nextSearchParams.set("company", company.trim());
  }

  if (typeof location === "string" && location.trim()) {
    nextSearchParams.set("location", location.trim());
  }

  if (typeof freshWithinHours === "string" && freshWithinHours.trim()) {
    nextSearchParams.set("freshWithinHours", freshWithinHours.trim());
  }

  for (const ats of parseDelimitedValue(formData.get("ats"))) {
    nextSearchParams.append("ats", ats);
  }

  for (const remoteMode of parseDelimitedValue(formData.get("remoteModes"))) {
    nextSearchParams.append("remoteModes", remoteMode);
  }

  for (const employmentType of parseDelimitedValue(
    formData.get("employmentTypes")
  )) {
    nextSearchParams.append("employmentTypes", employmentType);
  }

  return nextSearchParams;
}

/** Renders the client-side search dashboard and normalized job results. */
export function JobsDashboardPage({
  onRefreshRequested,
  refreshToken,
}: JobsDashboardPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobResults, setJobResults] = useState<JobSearchResponseData | null>(
    null
  );
  const [syncStatus, setSyncStatus] = useState<JobSyncRunSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const keyword = searchParams.get("keyword") ?? "";
  const company = searchParams.get("company") ?? "";
  const location = searchParams.get("location") ?? "";
  const ats = searchParams.getAll("ats");
  const remoteModes = searchParams.getAll("remoteModes");
  const employmentTypes = searchParams.getAll("employmentTypes");
  const freshWithinHours = searchParams.get("freshWithinHours") ?? "72";

  useEffect(() => {
    let isActive = true;

    setIsLoading(true);
    setErrorMessage(null);

    void Promise.all([
      fetchJobs({
        keyword: keyword || undefined,
        company: company || undefined,
        ats: ats.length
          ? (ats as Array<"ashby" | "greenhouse" | "lever" | "workday">)
          : undefined,
        location: location || undefined,
        remoteModes: remoteModes.length
          ? (remoteModes as Array<"hybrid" | "on_site" | "remote" | "unknown">)
          : undefined,
        employmentTypes: employmentTypes.length
          ? (employmentTypes as Array<
              | "contract"
              | "full_time"
              | "internship"
              | "part_time"
              | "temporary"
              | "unknown"
            >)
          : undefined,
        freshWithinHours: Number.parseInt(freshWithinHours, 10) || 72,
        page: 1,
        pageSize: 20,
      }),
      fetchSyncStatus(),
    ])
      .then(([jobsResponse, syncResponse]) => {
        if (!isActive) {
          return;
        }

        setJobResults(jobsResponse);
        setSyncStatus(syncResponse);
      })
      .catch((error) => {
        if (!isActive) {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Failed to load jobs."
        );
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [
    ats.join(","),
    company,
    employmentTypes.join(","),
    freshWithinHours,
    keyword,
    location,
    refreshToken,
    remoteModes.join(","),
  ]);

  return (
    <section
      aria-label="Jobs search dashboard"
      className="grid gap-8"
      role="region"
    >
      <Card aria-label="Search filters" role="search">
        <CardHeader className="gap-4">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <CardTitle>Search direct ATS jobs</CardTitle>
              <CardDescription>
                Freshness-first search over verified company-owned sources.
              </CardDescription>
            </div>
            <div className="rounded-2xl bg-zinc-100 px-4 py-3 text-sm text-zinc-700">
              Latest sync:{" "}
              {syncStatus?.finishedAt
                ? new Date(syncStatus.finishedAt).toLocaleString()
                : "Not run yet"}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-4 lg:grid-cols-6"
            key={searchParams.toString()}
            onSubmit={(event: FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              setSearchParams(createSearchParamsFromForm(event.currentTarget));
            }}
          >
            <label className="grid gap-2 lg:col-span-2">
              <span className="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">
                Keyword
              </span>
              <Input
                aria-label="Search keyword"
                defaultValue={keyword}
                name="keyword"
                type="text"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">
                Company
              </span>
              <Input
                aria-label="Company filter"
                defaultValue={company}
                name="company"
                type="text"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">
                ATS
              </span>
              <Input
                aria-label="ATS vendors"
                defaultValue={ats.join(", ")}
                name="ats"
                type="text"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">
                Location
              </span>
              <Input
                aria-label="Location filter"
                defaultValue={location}
                name="location"
                type="text"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">
                Freshness (hours)
              </span>
              <Input
                aria-label="Freshness window in hours"
                defaultValue={freshWithinHours}
                min={1}
                name="freshWithinHours"
                type="number"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">
                Remote mode
              </span>
              <Input
                aria-label="Remote mode filter"
                defaultValue={remoteModes.join(", ")}
                name="remoteModes"
                type="text"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">
                Employment type
              </span>
              <Input
                aria-label="Employment type filter"
                defaultValue={employmentTypes.join(", ")}
                name="employmentTypes"
                type="text"
              />
            </label>
            <div className="flex items-end">
              <Button className="w-full" type="submit">
                Apply Filters
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      {isLoading ? (
        <Card>
          <CardContent className="p-10 text-center text-sm text-zinc-600">
            Loading jobs...
          </CardContent>
        </Card>
      ) : errorMessage ? (
        <Card className="border-rose-200">
          <CardContent className="p-10 text-center text-sm text-rose-700">
            {errorMessage}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-zinc-600">
              Showing {jobResults?.items.length ?? 0} of{" "}
              {jobResults?.total ?? 0} normalized jobs.
            </p>
          </div>
          {jobResults && jobResults.items.length > 0 ? (
            jobResults.items.map((job) => (
              <JobCard job={job} key={job.id} onUpdated={onRefreshRequested} />
            ))
          ) : (
            <Card className="border-dashed">
              <CardContent className="p-10 text-center text-sm text-zinc-600">
                No direct ATS jobs matched the current filters.
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </section>
  );
}
