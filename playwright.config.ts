import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
 timeout: 30000,
  expect: {
    timeout: 5000,
  },

  reporter: 'html',
  use: {
    baseURL: 'https://web-six-beta-34.vercel.app/login',
    trace: 'on-first-retry',
    launchOptions: {
      slowMo: 0, // ms to delay each action by x milli seconds
    },
  },


  projects: [
    /* Desktop Configurations */
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'] },
    },

    /* Mobile Emulation Configurations */
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 14'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] },
    },
  ],
});