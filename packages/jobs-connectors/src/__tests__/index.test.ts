/**
 * @file packages/jobs-connectors/src/__tests__/index.test.ts
 * @author Guy Romelle Magayano
 * @description Connector fixture tests for ATS verification and normalization flows.
 */

import { afterEach, describe, expect, it, vi } from "vitest";

import { ashbyFixture } from "../__fixtures__/ashby";
import { greenhouseFixture } from "../__fixtures__/greenhouse";
import { leverFixture } from "../__fixtures__/lever";
import { workdayFixture } from "../__fixtures__/workday";
import { curatedSeedSources, syncSource, verifySource } from "../index";

function createJsonResponse(payload: unknown): Response {
  return new Response(JSON.stringify(payload), {
    headers: {
      "content-type": "application/json",
    },
    status: 200,
  });
}

describe("jobs-connectors", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("syncs Workday sources from the CXS endpoint", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(createJsonResponse(workdayFixture))
    );

    const jobs = await syncSource(curatedSeedSources[0]!);

    expect(jobs).toHaveLength(1);
    expect(jobs[0]?.sourceAts).toBe("workday");
    expect(jobs[0]?.canonicalUrl).toContain("software-engineer");
  });

  it("syncs Greenhouse sources through the public board API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(createJsonResponse(greenhouseFixture))
    );

    const jobs = await syncSource(curatedSeedSources[1]!);

    expect(jobs).toHaveLength(1);
    expect(jobs[0]?.remoteMode).toBe("remote");
  });

  it("syncs Lever sources through the postings API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(createJsonResponse(leverFixture))
    );

    const jobs = await syncSource(curatedSeedSources[2]!);

    expect(jobs).toHaveLength(1);
    expect(jobs[0]?.employmentType).toBe("full_time");
  });

  it("syncs Ashby sources through the GraphQL endpoint", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(createJsonResponse(ashbyFixture))
    );

    const jobs = await syncSource(curatedSeedSources[3]!);

    expect(jobs).toHaveLength(1);
    expect(jobs[0]?.sourceAts).toBe("ashby");
  });

  it("returns failed verification results when a connector request rejects", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("boom")));

    const result = await verifySource(curatedSeedSources[0]!);

    expect(result.verified).toBe(false);
    expect(result.error).toContain("boom");
  });
});
