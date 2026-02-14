import { expect, test } from "@playwright/test";

test("@smoke about route renders", async ({ page }) => {
  const response = await page.goto("/about", { waitUntil: "domcontentloaded" });

  expect(response?.ok()).toBeTruthy();
  await expect(page.locator("body")).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
});
