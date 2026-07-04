# Prompt Engineering Log

## Module 1 – Login

### Prompt 1

Generate comprehensive Playwright test cases for a Login module.

Requirements:

- Valid Login
- Invalid Login
- Forgot Password
- Session Expiry
- Brute Force Lockout

Return the test cases in Gherkin format.

### Improvement

The first response generated only positive and negative scenarios.

I refined the prompt by explicitly mentioning security scenarios like brute-force lockout and session expiry to improve coverage.

---

## Module 2 – Dashboard

### Prompt

Generate Playwright test cases for a Dashboard page.

Cover:

- Widget Loading
- Data Accuracy
- Filter functionality
- Sorting
- Responsive Layout
- Permission-based Visibility

Return output in Gherkin format.

### Improvement

The initial response focused only on UI validation.

I refined the prompt by asking for business validation and permission-based scenarios.

---

## Module 3 – REST API

### Prompt

Generate REST API test cases covering:

- Authentication
- CRUD Operations
- Error Handling
- Rate Limiting
- Schema Validation

Return in Gherkin format.

### Improvement

The initial response lacked schema validation.

The prompt was refined to include response validation and negative scenarios.