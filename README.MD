# 🎭 KashMap Playwright Automation Framework

[![Playwright Tests](https://github.com/niiwazz/playwright_learn/actions/workflows/playwright.yml/badge.svg)](https://github.com/niiwazz/playwright_learn/actions)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Playwright Version](https://img.shields.io/badge/playwright-v1.40%2B-blue.svg)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

An enterprise-grade, scalable End-to-End (E2E) testing framework designed for the **KashMap** financial management platform. Built on **Playwright** and **TypeScript**, this repository implements Page Object Model (POM), custom Page Fixtures, dynamic data factories, state-based authentication seeding, API network mocking, and CI/CD pipeline integration.

---

## 🏗️ Enterprise Architecture Diagram

The diagram below illustrates the end-to-end flow from UI action execution and dynamic data generation to authentication seeding, API network mocking, and automated execution within GitHub Actions CI/CD pipelines.


```

+-----------------------------------------------------------------------------------------------+
|                                  Enterprise Test Architecture                                 |
+-----------------------------------------------------------------------------------------------+

+-----------------------------------------------------------------------------------------------+
|                                 GitHub Actions CI/CD Pipeline                                 |
|                             (Triggers on Push, PR & Schedule)                                 |
+-----------------------------------------------T-----------------------------------------------+
|
v
+-----------------------------------------------------------------------------------------------+
|                                 Playwright Execution Engine                                   |
|                   (Parallel Execution across Chromium, Firefox, WebKit)                       |
+-----------------------T-------------------------------------------------------T---------------+
|                                                       |
v                                                       v
+-----------------------------------------------+       +---------------------------------------+
|             Network Mocking Layer             |       |       API & State Seeding Layer       |
|  - Route Interception (page.route)            |       |  - Global Setup (auth.setup)          |
|  - Mock API Data (mockAPITest)                |       |  - Pre-built session state            |
+-----------------------------------------------+       |    (storageState / cookies)           |
+-------------------+-------------------+
|
v
+-----------------------------------------------------------------------------------------------+
|                                  Page Object Model & Fixtures                                 |
|  - Page Classes: LoginPage, TransactionsPage, GoalsPage, InvestmentsPage, SideMenuPage        |
|  - Fixtures: pageFixtures.ts (Injects instantiated POMs directly into test scopes)            |
|  - Dynamic Data: dynamicFactories.ts (Faker/timestamp payload generators)                    |
+-----------------------------------------------+-----------------------------------------------+
|
v
+-----------------------------------------------------------------------------------------------+
|                                  Target Application (UI)                                      |
|                           [https://web-six-beta-34.vercel.app/]                               |
+-----------------------------------------------------------------------------------------------+

```

---

## ✨ Framework Features

* **🏎️ Parallel Execution & Cross-Browser Support:** Executes tests concurrently across Chromium, Firefox, and WebKit to minimize execution time and maximize test coverage.
* **🔐 Fast Authentication Seeding via `storageState`:** Generates and reuses authenticated user states (`auth.setup.ts`) to eliminate redundant UI login flows across test suites.
* **💉 Custom Page Fixtures:** Extends Playwright’s `@playwright/test` (`fixtures/pageFixtures.ts`) to inject pre-instantiated Page Objects (`loginPage`, `transactionsPage`, `goalsPage`, etc.) directly into test signatures, eliminating repetitive setup code.
* **🎲 Dynamic Test Data Generation:** Features flexible payload factory functions (`data/dynamicFactories.ts`) using runtime timestamps and overrides to ensure test isolation and data uniqueness.
* **🌐 Network Mocking Layer:** Supports intercepting and mocking API responses (`tests/mock/mockAPITest.spec.ts`) for deterministic and isolated UI testing.
* **🧹 Teardown & Lifecycle Hooks:** Integrated setup and cleanup spec workflows (`tests/teardown/cleanupTest.spec.ts`) to ensure clean state transitions before and after execution runs.
* **📊 Rich HTML Reporting:** Automatically records traces, screenshots on failure, and video recordings accessible through an interactive HTML report.

---

## 🛠️ Repository Structure

```text
├── data/                       # Static test data & dynamic data generator factories
│   ├── data.ts                 # Central data exports
│   ├── dynamicFactories.ts     # Dynamic payload builders (Transactions, Investments, Goals)
│   ├── goalsData.ts            # Default Goal data object definitions
│   ├── investmentData.ts       # Default Investment data object definitions
│   ├── transactionData.ts      # Default Transaction data object definitions
│   └── userCredentials.ts      # Test user credential constants
├── fixtures/
│   └── pageFixtures.ts         # Custom Playwright test fixture extending base test with POMs
├── pages/                      # Page Object Model (POM) class definitions
│   ├── exceptionsPage.ts       # Specific exception handlers/locators
│   ├── goalsPage.ts            # Locators and workflows for Goals module
│   ├── investmentsPage.ts      # Locators and workflows for Investments module
│   ├── loginPage.ts            # Authentication page locators and actions
│   ├── settingsPage.ts         # Locators for user settings & theme toggling
│   ├── sideMenuPage.ts         # Sidebar menu navigation locators
│   └── transactionsPage.ts     # Locators and workflows for Transactions table and dialogs
├── tests/                      # Automated Test Specs
│   ├── mock/                   # API network mocking specs
│   │   └── mockAPITest.spec.ts
│   ├── setup/                  # Global authentication setup
│   │   └── auth.setup.ts
│   ├── teardown/               # Data cleanup and post-test specs
│   │   └── cleanupTest.spec.ts
│   └── ui/                     # End-to-End UI functional test specs
│       ├── goalsTest.spec.ts
│       ├── investmentsTest.spec.ts
│       ├── loginTest.spec.ts
│       ├── sideMenuTest.spec.ts
│       └── transactionsTest.spec.ts
├── playwright.config.ts        # Global Playwright framework configuration
├── package.json                # Project dependencies and script runner commands
└── tsconfig.json               # TypeScript compiler configuration

```

---

## 🚀 Quick Start Commands

### 1. Prerequisites

Ensure you have the following installed on your machine:

* [Node.js](https://nodejs.org/?utm_source=gemini) (v18.0.0 or higher)
* `npm` or `yarn`

### 2. Installation

Clone the repository and install dependencies along with the required Playwright browser binaries:

```bash
# Clone the repository
git clone [https://github.com/niiwazz/playwright_learn.git](https://github.com/niiwazz/playwright_learn.git)
cd playwright_learn

# Install Node dependencies
npm install

# Install Playwright browser binaries and dependencies
npx playwright install --with-deps

```

### 3. Local Test Execution Commands

```bash
# Run all E2E tests in headless mode
npx playwright test

# Run tests in UI mode (Interactive Debugger & Time Travel)
npx playwright test --ui

# Run tests in headed mode (Visual Execution)
npx playwright test --headed

# Run tests on a specific browser (e.g., Chromium, Firefox, WebKit)
npx playwright test --project=chromium

# Run a specific spec file
npx playwright test tests/ui/transactionsTest.spec.ts

# Debug tests step-by-step
npx playwright test --debug

```

### 4. Running via Docker Container

To ensure consistency across isolated environments, execute tests inside the official Playwright Docker container:

```bash
# Pull official Playwright Docker image and run tests
docker run --rm -v $(pwd):/work -w /work [mcr.microsoft.com/playwright:v1.40.0-jammy](https://mcr.microsoft.com/playwright:v1.40.0-jammy) npx playwright test

```

### 5. Viewing Test Reports

Playwright automatically logs execution details, failure screenshots, traces, and videos into the `playwright-report` folder. Open the interactive report by running:

```bash
npx playwright show-report

```

---

## 💡 Code Highlights & Implementation Best Practices

### Custom Page Fixtures (`fixtures/pageFixtures.ts`)

Instead of manually instantiating page objects inside every test file, custom fixtures inject ready-to-use instances:

```typescript
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { TransactionsPage } from '../pages/transactionsPage';

type MyFixtures = {
  loginPage: LoginPage;
  transactionsPage: TransactionsPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  transactionsPage: async ({ page }, use) => {
    await use(new TransactionsPage(page));
  },
});

export { expect } from '@playwright/test';

```

### Dynamic Data Factories (`data/dynamicFactories.ts`)

Avoid duplicate data conflicts during parallel execution using dynamic runtime payloads:

```typescript
import { VALID_EXPENSE_TRANSACTION } from './transactionData';

export const generateTransactionPayload = (override = {}) => ({
  ...VALID_EXPENSE_TRANSACTION,
  notes: `AutoTest-${Date.now()}`,
  ...override,
});

```

---

## 🤝 Contributing & Guidelines

1. Follow the **Page Object Model (POM)** design pattern for any new screens added under `pages/`.
2. Ensure new selectors utilize accessibility-first locators (`getByRole`, `getByPlaceholder`, `getByText`).
3. Add corresponding page classes into `fixtures/pageFixtures.ts` for clean test injections.

```

```
