/**
 * @file packages/jobs-domain/src/__tests__/index.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for jobs domain normalization and lifecycle helpers.
 */

import { describe, expect, it } from "vitest";

import {
  buildJobFingerprint,
  createCanonicalUrl,
  createNormalizedJobRecord,
  inferRemoteMode,
  normalizeEmploymentType,
  resolveLifecycleTransition,
} from "../index";

describe("jobs-domain", () => {
  it("removes query strings and fragments from canonical URLs", () => {
    expect(
      createCanonicalUrl("https://example.com/jobs/123?gh_jid=123#apply")
    ).toBe("https://example.com/jobs/123");
  });

  it("creates stable fingerprints for the same job shape", () => {
    const first = buildJobFingerprint({
      canonicalUrl: "https://example.com/jobs/123?tracking=1",
      company: "Example",
      location: "Remote - US",
      title: "Senior Engineer",
    });
    const second = buildJobFingerprint({
      canonicalUrl: "https://example.com/jobs/123",
      company: "example",
      location: "remote us",
      title: "senior engineer",
    });

    expect(first).toBe(second);
  });

  it("infers remote and hybrid modes from location labels", () => {
    expect(inferRemoteMode("Remote - US")).toBe("remote");
    expect(inferRemoteMode("Hybrid / New York, NY")).toBe("hybrid");
    expect(inferRemoteMode("Austin, Texas")).toBe("on_site");
  });

  it("normalizes employment types from raw labels", () => {
    expect(normalizeEmploymentType("Full-time")).toBe("full_time");
    expect(normalizeEmploymentType("Internship")).toBe("internship");
    expect(normalizeEmploymentType("Contract")).toBe("contract");
  });

  it("builds normalized job records with search text and dedupe keys", () => {
    const job = createNormalizedJobRecord({
      canonicalUrl: "https://example.com/jobs/123?foo=bar",
      company: "Example",
      employmentType: "full_time",
      externalJobId: "123",
      firstSeenAt: "2026-04-14T00:00:00.000Z",
      lastSeenAt: "2026-04-14T00:00:00.000Z",
      location: "Remote - US",
      postedAt: "2026-04-14T00:00:00.000Z",
      remoteMode: "remote",
      sourceAts: "greenhouse",
      sourceId: "source-1",
      summary: "Build product features.",
      title: "Senior Engineer",
    });

    expect(job.canonicalUrl).toBe("https://example.com/jobs/123");
    expect(job.dedupeKey).toHaveLength(64);
    expect(job.searchText).toContain("Senior Engineer");
  });

  it("resolves stale and verification failure lifecycle transitions", () => {
    expect(
      resolveLifecycleTransition({
        previousState: "active",
        seenInLatestSync: false,
        sourceVerified: true,
      }).nextState
    ).toBe("stale");

    expect(
      resolveLifecycleTransition({
        previousState: "active",
        seenInLatestSync: false,
        sourceVerified: false,
      }).nextState
    ).toBe("verification_failed");
  });
});
