# TestMu AI - SDET-1 Technical Assessment

## Overview

This repository contains my submission for the TestMu AI SDET-1 Assessment.

The objective was to build an AI-native automation framework capable of combining Playwright automation with Large Language Models (Google Gemini) to improve regression testing and failure analysis.

---

# Features

- Playwright Framework using JavaScript
- Page Object Model (POM)
- Login Automation
- Dashboard Validation
- REST API Testing
- AI Failure Explainer using Google Gemini
- Screenshot Capture on Failure
- AI-generated Gherkin Test Cases
- Prompt Engineering Documentation
- GitHub Actions Ready

---

# Tech Stack

- JavaScript
- Playwright
- Node.js
- Google Gemini API
- GitHub
- GitHub Actions

---

# Project Structure

```
ai/
api/
generated-testcases/
pages/
reports/
tests/
utils/
README.md
prompts.md
ai-usage-log.md
```

---

# AI Features

When a Playwright test fails:

1. Capture screenshot
2. Collect failure information
3. Send details to Google Gemini
4. Generate root cause analysis
5. Save explanation as Markdown report

---

# Test Modules

- Login Module
- Dashboard Module
- REST API Module

---

# Future Enhancements

- Self-Healing Locators
- AI-based Flaky Test Classification
- Autonomous Test Generation
- CI/CD AI Failure Reporting

---

# Author

**Tannu Sharma**
QA Engineer | Automation Testing | Playwright | AI-assisted Quality Engineering
