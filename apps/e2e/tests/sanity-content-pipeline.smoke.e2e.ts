import { type APIRequestContext, expect, test } from "@playwright/test";

const DEFAULT_API_BASE_URL = "http://127.0.0.1:5001";
const ARTICLE_LIST_ROUTE = "/v1/content/articles";
const PAGE_LIST_ROUTE = "/v1/content/pages";
const SANITY_WEBHOOK_REVALIDATE_ROUTE = "/api/revalidate/sanity";
const RESERVED_ROOT_PAGE_SLUGS = new Set([
  "about",
  "api",
  "articles",
  "contact",
  "feed.xml",
  "projects",
  "studio",
  "uses",
]);

type GatewaySuccessEnvelope<TData> = {
  success: true;
  data: TData;
};

type ContentArticleSummary = {
  slug?: string;
};

type ContentPageSummary = {
  slug?: string;
};

function getApiBaseUrl(): string {
  const explicitApiGatewayUrl =
    process.env.API_GATEWAY_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim();

  if (explicitApiGatewayUrl) {
    return explicitApiGatewayUrl.replace(/\/+$/, "");
  }

  return DEFAULT_API_BASE_URL;
}

function getWebhookSecret(): string {
  return process.env.SANITY_WEBHOOK_SECRET?.trim() ?? "";
}

function getSeededArticleSlug(): string | null {
  return getSafeSlug(process.env.E2E_SANITY_ARTICLE_SLUG);
}

function getSeededPageSlug(): string | null {
  return getSafeSlug(process.env.E2E_SANITY_PAGE_SLUG);
}

function getSafeSlug(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalizedValue = value.trim();
  return normalizedValue.length > 0 ? normalizedValue : null;
}

function isGatewaySuccessEnvelope<TData>(
  payload: unknown
): payload is GatewaySuccessEnvelope<TData> {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return false;
  }

  return (payload as Partial<GatewaySuccessEnvelope<TData>>).success === true;
}

function getArticleSlugFromPayload(payload: unknown): string | null {
  if (!isGatewaySuccessEnvelope<ContentArticleSummary[]>(payload)) {
    return null;
  }

  if (!Array.isArray(payload.data) || payload.data.length === 0) {
    return null;
  }

  const availableArticleSlugs = payload.data
    .map((article) => getSafeSlug(article?.slug))
    .filter((slug): slug is string => slug !== null);
  const seededArticleSlug = getSeededArticleSlug();

  if (seededArticleSlug) {
    expect(
      availableArticleSlugs,
      `Expected seeded article slug "${seededArticleSlug}" to exist in the API gateway response.`
    ).toContain(seededArticleSlug);

    return seededArticleSlug;
  }

  return availableArticleSlugs[0] ?? null;
}

function getPageSlugFromPayload(payload: unknown): string | null {
  if (!isGatewaySuccessEnvelope<ContentPageSummary[]>(payload)) {
    return null;
  }

  if (!Array.isArray(payload.data) || payload.data.length === 0) {
    return null;
  }

  const availablePageSlugs = payload.data
    .map((page) => getSafeSlug(page?.slug))
    .filter((slug): slug is string => slug !== null);
  const seededPageSlug = getSeededPageSlug();

  if (seededPageSlug) {
    expect(
      availablePageSlugs,
      `Expected seeded page slug "${seededPageSlug}" to exist in the API gateway response.`
    ).toContain(seededPageSlug);
    expect(
      RESERVED_ROOT_PAGE_SLUGS.has(seededPageSlug),
      `Seeded page slug "${seededPageSlug}" conflicts with a static App Router route and cannot be validated by this Sanity page smoke test.`
    ).toBe(false);

    return seededPageSlug;
  }

  return (
    availablePageSlugs.find((slug) => !RESERVED_ROOT_PAGE_SLUGS.has(slug)) ??
    null
  );
}

async function expectGatewayListOk(request: APIRequestContext, route: string) {
  const response = await request.get(`${getApiBaseUrl()}${route}`);
  expect(response.ok()).toBeTruthy();
  return response.json();
}

test.describe("@smoke @sanity sanity content pipeline", () => {
  test("article list/detail route + webhook revalidation route", async ({
    page,
    request,
  }) => {
    const webhookSecret = getWebhookSecret();

    test.skip(
      !webhookSecret,
      "SANITY_WEBHOOK_SECRET is required for webhook smoke checks."
    );

    const articlesPayload = await expectGatewayListOk(
      request,
      ARTICLE_LIST_ROUTE
    );
    const articleSlug = getArticleSlugFromPayload(articlesPayload);

    test.skip(!articleSlug, "No article content available in the API gateway.");

    const articlePageResponse = await page.goto(
      `/articles/${encodeURIComponent(articleSlug!)}`,
      {
        waitUntil: "domcontentloaded",
      }
    );

    expect(articlePageResponse?.ok()).toBeTruthy();
    await expect(page.locator("body")).toBeVisible();

    const revalidateResponse = await request.post(
      SANITY_WEBHOOK_REVALIDATE_ROUTE,
      {
        headers: {
          authorization: `Bearer ${webhookSecret}`,
          "content-type": "application/json",
        },
        data: {
          _type: "article",
          slug: articleSlug,
        },
      }
    );

    expect(revalidateResponse.ok()).toBeTruthy();

    const revalidatePayload = await revalidateResponse.json();

    expect(revalidatePayload).toMatchObject({
      success: true,
      revalidated: true,
      resource: "article",
    });
    expect(revalidatePayload.tags).toContain("articles");
    expect(revalidatePayload.tags).toContain(`article:${articleSlug}`);
    expect(revalidatePayload.paths).toContain("/articles");
    expect(revalidatePayload.paths).toContain(
      `/articles/${encodeURIComponent(articleSlug!)}`
    );
  });

  test("page list/detail route + webhook revalidation route", async ({
    page,
    request,
  }) => {
    const webhookSecret = getWebhookSecret();

    test.skip(
      !webhookSecret,
      "SANITY_WEBHOOK_SECRET is required for webhook smoke checks."
    );

    const pagesPayload = await expectGatewayListOk(request, PAGE_LIST_ROUTE);
    const pageSlug = getPageSlugFromPayload(pagesPayload);

    test.skip(
      !pageSlug,
      "No Sanity page slug available (or all page slugs conflict with static app routes)."
    );

    const contentPageResponse = await page.goto(
      `/${encodeURIComponent(pageSlug!)}`,
      {
        waitUntil: "domcontentloaded",
      }
    );

    expect(contentPageResponse?.ok()).toBeTruthy();
    await expect(page.locator("body")).toBeVisible();

    const revalidateResponse = await request.post(
      SANITY_WEBHOOK_REVALIDATE_ROUTE,
      {
        headers: {
          authorization: `Bearer ${webhookSecret}`,
          "content-type": "application/json",
        },
        data: {
          _type: "page",
          slug: pageSlug,
        },
      }
    );

    expect(revalidateResponse.ok()).toBeTruthy();

    const revalidatePayload = await revalidateResponse.json();

    expect(revalidatePayload).toMatchObject({
      success: true,
      revalidated: true,
      resource: "page",
    });
    expect(revalidatePayload.tags).toContain("pages");
    expect(revalidatePayload.tags).toContain(`page:${pageSlug}`);
    expect(revalidatePayload.paths).toContain(
      `/${encodeURIComponent(pageSlug!)}`
    );
  });
});
