/**
 * @file apps/web/src/app/api/revalidate/sanity/__tests__/route.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for the Sanity webhook revalidation route handler.
 */

import { revalidatePath, revalidateTag } from "next/cache";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "../route";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}));

vi.mock("@portfolio/logger", () => ({
  default: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

function createWebhookRequest(
  body: unknown,
  options?: {
    authorization?: string;
    contentType?: string;
  }
): Request {
  return new Request("http://localhost:3000/api/revalidate/sanity", {
    method: "POST",
    headers: {
      ...(options?.contentType ? { "content-type": options.contentType } : {}),
      ...(options?.authorization
        ? {
            authorization: options.authorization,
          }
        : {}),
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/revalidate/sanity", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it("returns 500 when the Sanity webhook secret is not configured", async () => {
    const response = await POST(
      createWebhookRequest(
        {
          _type: "article",
          slug: {
            current: "example-article",
          },
        },
        {
          authorization: "Bearer test-secret",
          contentType: "application/json",
        }
      ) as never
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toMatchObject({
      success: false,
      error: {
        code: "SANITY_WEBHOOK_SECRET_MISSING",
      },
    });
    expect(revalidateTag).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("returns 401 when the webhook authorization is invalid", async () => {
    vi.stubEnv("SANITY_WEBHOOK_SECRET", "expected-secret");

    const response = await POST(
      createWebhookRequest(
        {
          _type: "article",
          slug: {
            current: "example-article",
          },
        },
        {
          authorization: "Bearer wrong-secret",
          contentType: "application/json",
        }
      ) as never
    );

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toMatchObject({
      success: false,
      error: {
        code: "UNAUTHORIZED",
      },
    });
    expect(revalidateTag).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("returns 400 when the webhook payload is invalid JSON", async () => {
    vi.stubEnv("SANITY_WEBHOOK_SECRET", "expected-secret");

    const response = await POST(
      createWebhookRequest("{ invalid", {
        authorization: "Bearer expected-secret",
        contentType: "application/json",
      }) as never
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      success: false,
      error: {
        code: "INVALID_JSON",
      },
    });
    expect(revalidateTag).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("revalidates article list and detail tags for article payloads", async () => {
    vi.stubEnv("SANITY_WEBHOOK_SECRET", "expected-secret");

    const response = await POST(
      createWebhookRequest(
        {
          _type: "article",
          slug: {
            current: "example-article",
          },
          previousSlug: {
            current: "previous-article",
          },
        },
        {
          authorization: "Bearer expected-secret",
          contentType: "application/json",
        }
      ) as never
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      success: true,
      revalidated: true,
      documentType: "article",
      resource: "article",
      tags: ["articles", "article:example-article", "article:previous-article"],
      paths: [
        "/articles",
        "/articles/example-article",
        "/articles/previous-article",
      ],
      slugs: ["example-article", "previous-article"],
    });
    expect(revalidateTag).toHaveBeenCalledTimes(3);
    expect(revalidateTag).toHaveBeenNthCalledWith(1, "articles", "max");
    expect(revalidateTag).toHaveBeenNthCalledWith(
      2,
      "article:example-article",
      "max"
    );
    expect(revalidateTag).toHaveBeenNthCalledWith(
      3,
      "article:previous-article",
      "max"
    );
    expect(revalidatePath).toHaveBeenCalledTimes(3);
    expect(revalidatePath).toHaveBeenNthCalledWith(1, "/articles");
    expect(revalidatePath).toHaveBeenNthCalledWith(
      2,
      "/articles/example-article"
    );
    expect(revalidatePath).toHaveBeenNthCalledWith(
      3,
      "/articles/previous-article"
    );
  });

  it("revalidates standalone page tags and paths for page payloads", async () => {
    vi.stubEnv("SANITY_WEBHOOK_SECRET", "expected-secret");

    const response = await POST(
      createWebhookRequest(
        {
          _type: "page",
          slug: {
            current: "now",
          },
        },
        {
          authorization: "Bearer expected-secret",
          contentType: "application/json",
        }
      ) as never
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      success: true,
      revalidated: true,
      documentType: "page",
      resource: "page",
      tags: ["pages", "page:now"],
      paths: ["/now"],
      slugs: ["now"],
    });
    expect(revalidateTag).toHaveBeenCalledTimes(2);
    expect(revalidateTag).toHaveBeenNthCalledWith(1, "pages", "max");
    expect(revalidateTag).toHaveBeenNthCalledWith(2, "page:now", "max");
    expect(revalidatePath).toHaveBeenCalledTimes(1);
    expect(revalidatePath).toHaveBeenNthCalledWith(1, "/now");
  });

  it("returns 202 without revalidating for unsupported payload types", async () => {
    vi.stubEnv("SANITY_WEBHOOK_SECRET", "expected-secret");

    const response = await POST(
      createWebhookRequest(
        {
          _type: "author",
          name: "Example Author",
        },
        {
          authorization: "Bearer expected-secret",
          contentType: "application/json",
        }
      ) as never
    );

    expect(response.status).toBe(202);
    await expect(response.json()).resolves.toMatchObject({
      success: true,
      revalidated: false,
      reason: "unsupported_document_type",
      documentType: "author",
    });
    expect(revalidateTag).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
