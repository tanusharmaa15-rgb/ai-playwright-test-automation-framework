export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.inventoryTitle = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.productPrices = page.locator('.inventory_item_price');
    this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
  }

  async verifyDashboardLoaded() {
    await this.inventoryTitle.waitFor({ state: 'visible' });
    const title = await this.inventoryTitle.textContent();
    if (title.trim() !== 'Products') {
      throw new Error(`Expected title "Products" but got "${title}"`);
    }
  }

  async verifyProductsVisible() {
    await this.inventoryItems.first().waitFor({ state: 'visible' });
  }

  async getProductCount() {
    return this.inventoryItems.count();
  }

  async getProductPrices() {
    const priceElements = await this.productPrices.allTextContents();
    return priceElements.map(p => parseFloat(p.replace('$', '')));
  }

  async sortByPriceLowToHigh() {
    await this.sortDropdown.selectOption('lohi');
  }

  async sortByPriceHighToLow() {
    await this.sortDropdown.selectOption('hilo');
  }

  async addFirstProductToCart() {
    await this.addToCartButtons.first().click();
  }

  async getCartCount() {
    return this.cartBadge.textContent();
  }
}
