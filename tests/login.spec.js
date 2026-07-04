import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { explainFailure } from "../ai/gemini.js";
import fs from "fs";

test.describe("Login Module", () => {
  test("Valid Login", async ({ page }) => {
    const loginPage = new LoginPage(page);

    try {
      await loginPage.navigate();

      await loginPage.login("standard_user", "secret_sauce");

      await loginPage.verifySuccessfulLogin();
    } catch (error) {
      console.log("Test Failed. Sending details to Gemini...");

      // Capture screenshot
      await page.screenshot({
        path: "./reports/failure.png",
        fullPage: true,
      });

      const pageTitle = await page.title();
      const currentURL = page.url();

      const failureDetails = `
Test Name: Valid Login

Current URL:
${currentURL}

Page Title:
${pageTitle}

Playwright Error:
${error.toString()}
`;

      const explanation = await explainFailure(failureDetails);

      fs.writeFileSync("./reports/failure-analysis.md", explanation);

      throw error;
    }
  });
});
