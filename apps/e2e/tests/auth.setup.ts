import { mkdir } from "node:fs/promises";
import path from "node:path";
import { test } from "@playwright/test";

const authDirectory = path.resolve(process.cwd(), "playwright/.auth");
const authFile = path.resolve(authDirectory, "user.json");

test("bootstrap anonymous storage state", async ({ page }) => {
  await mkdir(authDirectory, { recursive: true });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.context().storageState({ path: authFile });
});
