import { test } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage.js";
import { DashboardPage } from "../pages/DashboardPage.js";

test("Dashboard Validation", async ({ page }) => {
  const login = new LoginPage(page);
  const dashboard = new DashboardPage(page);

  await login.navigate();

  await login.login("standard_user", "secret_sauce");

  await login.verifySuccessfulLogin();

  await dashboard.verifyDashboardLoaded();

  await dashboard.verifyProductsDisplayed();

  await dashboard.verifyProductCount();

  await dashboard.verifySortDropdownVisible();

  await dashboard.sortByPriceLowToHigh();
});
