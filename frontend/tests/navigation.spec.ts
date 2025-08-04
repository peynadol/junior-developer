import { test, expect } from "@playwright/test";

test("user can browse categories and view content", async ({ page }) => {
  await page.goto("/");
  await page.click("text=Consumer");
  await expect(page).toHaveURL("/category/consumer_goods_and_services");
  await expect(page.locator("h1")).toHaveText("Consumer Goods and Services");
});

test("user can return home via Home link", async ({ page }) => {
  await page.goto("/category/consumer_goods_and_services");
  await page.click("text=Home");
  await expect(page).toHaveURL("/");
  await expect(page.locator("h1")).toHaveText("Content Categories");
});

test.describe("Keyboard Navigation", () => {
  test.skip(
    ({ browserName }) => browserName === "webkit",
    "WebKit requires special setup for tab navigation"
  );

  test("keyboard navigation works", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL("/category/benefits_and_tax_credits");
  });
});
