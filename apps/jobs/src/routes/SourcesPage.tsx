/**
 * @file apps/jobs/src/routes/SourcesPage.tsx
 * @author Guy Romelle Magayano
 * @description Source registry and connector health page.
 */

import { useEffect, useState } from "react";

import { Badge } from "@jobs/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@jobs/components/ui/card";
import { fetchJobSources, fetchSyncStatus } from "@jobs/lib/api";

import type { JobSource, JobSyncRunSummary } from "@portfolio/api-contracts";

type SourcesPageProps = {
  refreshToken: number;
};

function resolveVerificationVariant(
  status: JobSource["verificationStatus"]
): "danger" | "secondary" | "success" {
  switch (status) {
    case "verified":
      return "success";
    case "verification_failed":
      return "danger";
    default:
      return "secondary";
  }
}

/** Renders the verified source registry and latest sync summary. */
export function SourcesPage({ refreshToken }: SourcesPageProps) {
  const [sources, setSources] = useState<JobSource[]>([]);
  const [syncStatus, setSyncStatus] = useState<JobSyncRunSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    setIsLoading(true);
    setErrorMessage(null);

    void Promise.all([fetchJobSources(), fetchSyncStatus()])
      .then(([sourcesResponse, syncResponse]) => {
        if (!isActive) {
          return;
        }

        setSources(sourcesResponse);
        setSyncStatus(syncResponse);
      })
      .catch((error) => {
        if (!isActive) {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Failed to load sources."
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
  }, [refreshToken]);

  return (
    <section aria-label="Source registry" className="grid gap-8" role="region">
      <div className="grid gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
          Source registry
        </h1>
        <p className="text-sm text-zinc-600">
          Curated ATS board roots, verification state, and connector throughput.
        </p>
      </div>
      <div className="grid gap-3 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Sources discovered</CardDescription>
            <CardTitle className="text-3xl">
              {syncStatus?.sourcesDiscovered ?? sources.length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Sources verified</CardDescription>
            <CardTitle className="text-3xl">
              {syncStatus?.sourcesVerified ?? 0}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Verification failures</CardDescription>
            <CardTitle className="text-3xl">
              {syncStatus?.sourcesFailedVerification ?? 0}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Jobs seen in latest run</CardDescription>
            <CardTitle className="text-3xl">
              {syncStatus?.jobsSeen ?? 0}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
      {isLoading ? (
        <Card>
          <CardContent className="p-10 text-center text-sm text-zinc-600">
            Loading sources...
          </CardContent>
        </Card>
      ) : errorMessage ? (
        <Card className="border-rose-200">
          <CardContent className="p-10 text-center text-sm text-rose-700">
            {errorMessage}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {sources.map((source) => (
            <Card
              aria-labelledby={`source-${source.id}-title`}
              key={source.id}
              role="article"
            >
              <CardHeader className="gap-4">
                <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                  <div className="grid gap-2">
                    <Badge variant="outline">{source.ats}</Badge>
                    <CardTitle id={`source-${source.id}-title`}>
                      {source.companyName}
                    </CardTitle>
                  </div>
                  <Badge
                    variant={resolveVerificationVariant(
                      source.verificationStatus
                    )}
                  >
                    {source.verificationStatus}
                  </Badge>
                </div>
                <CardDescription>
                  Last verified:{" "}
                  {source.lastVerifiedAt
                    ? new Date(source.lastVerifiedAt).toLocaleString()
                    : "Never"}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <a
                  className="text-sm break-all text-zinc-700 underline decoration-zinc-300 underline-offset-4"
                  href={source.boardUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {source.boardUrl}
                </a>
                {source.verificationError ? (
                  <p className="text-sm text-rose-700">
                    {source.verificationError}
                  </p>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
