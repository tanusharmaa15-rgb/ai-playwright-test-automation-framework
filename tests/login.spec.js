import { test, expect } from '../fixtures/index.js';
import { explainFailure } from '../ai/gemini.js';
import fs from 'fs';
import testData from '../test-data/users.json' assert { type: 'json' };

test.describe('Login Module', () => {

  test.describe('@smoke Valid Login', () => {
    test('standard user can log in successfully', async ({ loginPage }) => {
      try {
        await loginPage.navigate();
        await loginPage.login(testData.standardUser.username, testData.standardUser.password);
        await loginPage.verifySuccessfulLogin();
      } catch (error) {
        const screenshotPath = './reports/failure-login.png';
        await loginPage.page.screenshot({ path: screenshotPath, fullPage: true });
        const analysis = await explainFailure({
          error: error.message,
          url: loginPage.page.url(),
          title: await loginPage.page.title(),
          screenshot: screenshotPath,
        });
        fs.writeFileSync('./reports/failure-analysis-login.md', analysis);
        throw error;
      }
    });
  });

  test.describe('@regression Negative Login Scenarios', () => {
    test('locked out user sees error message', async ({ loginPage }) => {
      await loginPage.navigate();
      await loginPage.login(testData.lockedUser.username, testData.lockedUser.password);
      await loginPage.verifyErrorMessage('Epic sadface: Sorry, this user has been locked out.');
    });

    test('wrong password shows error', async ({ loginPage }) => {
      await loginPage.navigate();
      await loginPage.login(testData.standardUser.username, 'wrong_password');
      await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match');
    });

    test('empty username shows validation error', async ({ loginPage }) => {
      await loginPage.navigate();
      await loginPage.login('', testData.standardUser.password);
      await loginPage.verifyErrorMessage('Epic sadface: Username is required');
    });

    test('empty password shows validation error', async ({ loginPage }) => {
      await loginPage.navigate();
      await loginPage.login(testData.standardUser.username, '');
      await loginPage.verifyErrorMessage('Epic sadface: Password is required');
    });
  });

  test.describe('@regression Parameterised — invalid credential combinations', () => {
    const invalidCreds = [
      { username: 'invalid_user', password: 'secret_sauce', label: 'invalid username' },
      { username: 'standard_user', password: 'wrong_pass', label: 'invalid password' },
      { username: '', password: '', label: 'both fields empty' },
    ];

    for (const { username, password, label } of invalidCreds) {
      test(`login fails with ${label}`, async ({ loginPage }) => {
        await loginPage.navigate();
        await loginPage.login(username, password);
        await expect(loginPage.errorMessage).toBeVisible();
      });
    }
  });

});
