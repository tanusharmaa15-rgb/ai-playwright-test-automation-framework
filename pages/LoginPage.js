export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorCloseButton = page.locator('[data-test="error"] .error-button');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifySuccessfulLogin() {
    await this.page.waitForURL('**/inventory.html', { timeout: 10_000 });
  }

  async verifyErrorMessage(expectedText) {
    await this.errorMessage.waitFor({ state: 'visible' });
    const text = await this.errorMessage.textContent();
    if (!text.includes(expectedText)) {
      throw new Error(`Expected error "${expectedText}" but got "${text}"`);
    }
  }

  async dismissError() {
    await this.errorCloseButton.click();
    await this.errorMessage.waitFor({ state: 'hidden' });
  }

  async logout() {
    await this.page.locator('#react-burger-menu-btn').click();
    await this.page.locator('#logout_sidebar_link').click();
    await this.page.waitForURL('**/');
  }
}
