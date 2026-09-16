import { defineConfig, devices } from '@playwright/test';
import path from 'path';

// Define the path where session state will be stored
const authFile = path.join(__dirname, '.auth/user.json');

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },

  reporter: 'html',
  use: {
    // Note: Update baseURL to app root domain so navigation to /dashboard works relative
    baseURL: 'https://web-six-beta-34.vercel.app',
    trace: 'on-first-retry',
    launchOptions: {
      slowMo: 1000,
    },
  },

  projects: [
    // 1. Setup Project: Runs auth.setup.ts before any tests execute
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // 2. Main Browser Projects: Depend on 'setup' and use saved storageState
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: authFile, // 👈 Uses pre-authenticated state!
      },
      dependencies: ['setup'], // 👈 Ensures 'setup' runs first
    },

    {
      name: 'mobile-safari',
      use: {
        ...devices['iPhone 14'],
        storageState: authFile,
      },
      dependencies: ['setup'],
    },

    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 7'],
        storageState: authFile,
      },
      dependencies: ['setup'],
    },
  ],
});