import { expect } from "@playwright/test";

export class DashboardPage {
  constructor(page) {
    this.page = page;

    this.inventoryTitle = page.locator(".title");
    this.inventoryItems = page.locator(".inventory_item");
    this.sortDropdown = page.locator(".product_sort_container");
  }

  async verifyDashboardLoaded() {
    await expect(this.inventoryTitle).toHaveText("Products");
  }

  async verifyProductsDisplayed() {
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  async verifyProductCount() {
    const count = await this.inventoryItems.count();

    expect(count).toBeGreaterThan(0);
  }

  async sortByPriceLowToHigh() {
    await this.sortDropdown.selectOption("lohi");
  }

  async verifySortDropdownVisible() {
    await expect(this.sortDropdown).toBeVisible();
  }
}
