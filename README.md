# AI-Native Playwright Test Automation Framework

An AI-powered Playwright automation framework built using JavaScript. This project demonstrates modern QA automation practices by combining Playwright, REST API testing, Page Object Model (POM), GitHub Actions, and AI-assisted test generation.

---

## Features

- UI Automation using Playwright
- REST API Testing
- Page Object Model (POM)
- AI-generated Gherkin test cases
- HTML Test Reports
- Screenshot capture on failures
- GitHub Actions CI/CD
- Clean and scalable project structure

---

## Tech Stack

- Playwright
- JavaScript
- Node.js
- REST APIs
- GitHub Actions
- OpenAI / LLM

---

## Project Structure

```
tests/
pages/
utils/
reports/
.github/workflows/
playwright.config.js
package.json
README.md
```

---

## Installation

```bash
git clone <repository-url>
cd ai-playwright-test-automation-framework
npm install
```

---

## Run Tests

```bash
npx playwright test
```

---

## Generate HTML Report

```bash
npx playwright show-report
```

---

## AI Integration

This framework demonstrates AI-assisted testing by generating Gherkin scenarios using an LLM to accelerate test design and improve coverage.

---

## CI/CD

Tests execute automatically through GitHub Actions whenever code is pushed to the repository.

---

## Future Improvements

- Self-healing locators
- AI bug summarization
- Flaky test detection
- Visual regression testing
- Cross-browser execution
