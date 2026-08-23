import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import path from 'path';

const authFile = path.join(process.cwd(), 'playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(process.env.STANDARD_USER, process.env.STANDARD_PASSWORD);
  await loginPage.verifySuccessfulLogin();
  await page.context().storageState({ path: authFile });
});
