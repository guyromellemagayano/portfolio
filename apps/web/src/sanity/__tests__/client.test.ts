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
