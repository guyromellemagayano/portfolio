import { expect, test } from "@playwright/test";

test("@smoke home route renders", async ({ page }) => {
  const response = await page.goto("/", { waitUntil: "domcontentloaded" });

  expect(response?.ok()).toBeTruthy();
  await expect(page.locator("body")).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
});
