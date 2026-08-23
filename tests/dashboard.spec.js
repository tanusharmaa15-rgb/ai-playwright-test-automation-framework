import { test, expect } from '../fixtures/index.js';
import testData from '../test-data/users.json' assert { type: 'json' };

test.describe('@smoke Dashboard Module', () => {

  test.beforeEach(async ({ loginPage, dashboardPage }) => {
    await loginPage.navigate();
    await loginPage.login(testData.standardUser.username, testData.standardUser.password);
    await loginPage.verifySuccessfulLogin();
  });

  test('dashboard shows Products heading', async ({ dashboardPage }) => {
    await dashboardPage.verifyDashboardLoaded();
  });

  test('all 6 products are visible', async ({ dashboardPage }) => {
    await dashboardPage.verifyProductsVisible();
    const count = await dashboardPage.getProductCount();
    expect(count).toBe(6);
  });

  test('@regression sort by price low to high reorders products', async ({ dashboardPage }) => {
    await dashboardPage.sortByPriceLowToHigh();
    const prices = await dashboardPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('@regression sort by price high to low reorders products', async ({ dashboardPage }) => {
    await dashboardPage.sortByPriceHighToLow();
    const prices = await dashboardPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  test('@regression add first product to cart updates cart badge', async ({ dashboardPage }) => {
    await dashboardPage.addFirstProductToCart();
    const cartCount = await dashboardPage.getCartCount();
    expect(cartCount).toBe('1');
  });

});
