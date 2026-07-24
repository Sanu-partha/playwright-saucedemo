# Playwright E2E Test Automation: SauceDemo

End-to-end UI test automation for [SauceDemo](https://www.saucedemo.com) built with Playwright and TypeScript.

## What it tests
- **Authentication**: valid login, locked-out user, invalid credentials, empty fields
- **Inventory**: product listing, sorting by price and name
- **Cart**: add/remove items, badge counter
- **Checkout**: full happy path, form validation

## Tech stack
- Playwright (TypeScript): cross-browser, auto-waiting
- Page Object Model: clean separation of selectors and logic
- Custom fixtures: reusable logged-in state
- GitHub Actions CI: runs on every push across Chromium, Firefox, WebKit

## Run locally
```bash
npm install
npx playwright install --with-deps
npx playwright test
npx playwright show-report
```

## Structure
```
tests/          # Test specs
pages/          # Page Object classes
fixtures/       # Reusable test setup
test-data/      # Test users and data
```

---
Built by [Saisaran Parthasarathy](https://leetcode.com/u/CoVoKOnitJ/) — SDET, 4+ years, India & France
