/**
 * @file apps/web/src/sanity/__tests__/client.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for Sanity client behavior used by Studio and Draft Mode.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  getSanityClient,
  getSanityConfig,
  hasSanityConfig,
} from "@web/sanity/client";
import {
  getSanityStudioConfig,
  requireSanityStudioConfig,
} from "@web/sanity/env";

const { createClientMock } = vi.hoisted(() => {
  const hoistedCreateClientMock = vi.fn(() => ({
    withConfig: vi.fn(),
  }));

  return {
    createClientMock: hoistedCreateClientMock,
  };
});

vi.mock("next-sanity", () => ({
  createClient: createClientMock,
}));

describe("sanity client", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    createClientMock.mockClear();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("returns null config when required env vars are missing", () => {
    expect(getSanityConfig()).toBeNull();
    expect(hasSanityConfig()).toBe(false);
  });

  it("returns config when required env vars are provided", () => {
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "demo-project");
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "production");

    expect(getSanityConfig()).toEqual({
      projectId: "demo-project",
      dataset: "production",
      apiVersion: "2025-02-19",
      token: undefined,
    });
    expect(hasSanityConfig()).toBe(true);
  });

  it("returns config when SANITY_STUDIO_* env vars are provided", () => {
    vi.stubEnv("SANITY_STUDIO_PROJECT_ID", "studio-project");
    vi.stubEnv("SANITY_STUDIO_DATASET", "production");
    vi.stubEnv("SANITY_STUDIO_API_VERSION", "2026-02-01");

    expect(getSanityConfig()).toEqual({
      projectId: "studio-project",
      dataset: "production",
      apiVersion: "2026-02-01",
      token: undefined,
    });
    expect(hasSanityConfig()).toBe(true);
  });

  it("returns null studio config when required env vars are missing", () => {
    expect(getSanityStudioConfig()).toBeNull();
  });

  it("throws when required studio config is missing", () => {
    expect(() => requireSanityStudioConfig()).toThrow(
      "Sanity Studio configuration is missing"
    );
  });

  it("falls back to SANITY_STUDIO_API_* env vars when SANITY_STUDIO_* is unset", () => {
    vi.stubEnv("SANITY_STUDIO_API_PROJECT_ID", "studio-api-project");
    vi.stubEnv("SANITY_STUDIO_API_DATASET", "staging");

    expect(getSanityConfig()).toEqual({
      projectId: "studio-api-project",
      dataset: "staging",
      apiVersion: "2025-02-19",
      token: undefined,
    });
    expect(hasSanityConfig()).toBe(true);
  });

  it("falls back to SANITY_* env vars when NEXT_PUBLIC_SANITY_* is unset", () => {
    vi.stubEnv("SANITY_PROJECT_ID", "server-project");
    vi.stubEnv("SANITY_DATASET", "development");
    vi.stubEnv("SANITY_API_VERSION", "2026-01-01");

    expect(getSanityConfig()).toEqual({
      projectId: "server-project",
      dataset: "development",
      apiVersion: "2026-01-01",
      token: undefined,
    });
    expect(hasSanityConfig()).toBe(true);
  });

  it("creates a sanity client with environment config", () => {
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "demo-project");
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "production");

    const client = getSanityClient();

    expect(client).toBeDefined();
    expect(createClientMock).toHaveBeenCalledWith({
      projectId: "demo-project",
      dataset: "production",
      apiVersion: "2025-02-19",
      useCdn: true,
    });
  });

  it("throws when sanity client is requested without required config", () => {
    expect(() => getSanityClient()).toThrow("Sanity configuration is missing");
  });
});
