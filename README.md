# AI-Native Playwright Test Automation Framework

A production-grade Playwright automation framework integrating AI-assisted failure analysis,
multi-browser execution, schema-validated API testing, and GitHub Actions CI/CD.

## Architecture

```
├── .github/workflows/      # CI/CD — parallel browser matrix
├── ai/                     # Gemini AI failure analysis module
├── fixtures/               # Custom Playwright fixtures (POM injection)
├── pages/                  # Page Object Model classes
├── test-data/              # Centralised test data (no hard-coded creds)
├── tests/                  # Test specs — tagged @smoke / @regression
├── utils/                  # Shared utilities (logger)
├── .env.example            # Environment variable reference
└── playwright.config.js    # Multi-browser, multi-reporter configuration
```

## Tech Stack

| Layer | Technology |
|---|---|
| Browser Automation | Playwright (Chromium, Firefox, WebKit) |
| API Testing | Playwright `request` fixture + Ajv schema validation |
| AI Integration | Google Gemini 2.5 Flash |
| CI/CD | GitHub Actions — browser matrix strategy |
| Reporting | HTML + JUnit (CI artifacts) |
| Language | JavaScript (ES Modules) |

## Quick Start

```bash
# 1. Clone and install
git clone <repo-url>
cd ai-playwright-test-automation-framework
npm install
npx playwright install

# 2. Configure environment
cp .env.example .env.dev
# edit .env.dev with your values

# 3. Run tests
npm test                    # all browsers
npm run test:smoke          # @smoke tags only
npm run test:regression     # @regression tags only
npm run test:chromium       # single browser
npm run report              # open HTML report
```

## AI-Assisted Failure Analysis

When a test fails, the framework automatically:
1. Captures a full-page screenshot
2. Collects URL, page title, and error details
3. Sends context to Gemini 2.5 Flash with an SDET-role prompt
4. Writes a structured root-cause analysis to `reports/failure-analysis-*.md`

This reduces mean time to debug (MTTD) by providing probable root causes and suggested fixes alongside the failure evidence.

## Test Strategy

| Tag | Purpose | Run On |
|---|---|---|
| `@smoke` | Core happy-path coverage, < 2 min | Every push |
| `@regression` | Full negative + edge case coverage | PR and nightly |

## CI/CD

Tests run in a parallel browser matrix on every push and pull request:

- Chromium, Firefox, WebKit run simultaneously (no sequential blocking)
- `fail-fast: false` — all browsers complete to provide full failure data
- HTML and JUnit reports uploaded as CI artifacts (30-day retention)
- Secrets injected via GitHub Actions Secrets — no credentials in code

## Key Design Decisions

**Custom Fixtures over raw `new Page()`**
Page objects are injected via Playwright's `test.extend()` fixture system. This avoids repetitive setup in each test and enables dependency injection for future extensions.

**Schema Validation on all API responses**
Every API endpoint is validated against an Ajv JSON Schema. Structural regressions (missing fields, wrong types) fail immediately rather than causing silent downstream errors.

**Centralised test data**
All usernames and passwords live in `test-data/users.json`. Tests import data by role rather than by credential string.
