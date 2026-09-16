// tests/auth.setup.ts
import { test as setup, expect } from '@playwright/test';
import * as path from 'path';

// Define the file path where the auth state will be stored
const authFile = path.join(__dirname, '../.auth/user.json');

setup('authenticate', async ({ page }) => {
  // 1. Perform UI login once
  await page.goto('https://web-six-beta-34.vercel.app/login');
  await page.getByRole('textbox', { name: 'email' }).fill('test@gail.com');
  await page.getByRole('textbox', { name: 'password' }).fill('passpass');
  await page.getByRole('button', { name: 'Log in' }).click();

  // 2. Wait until the user is fully logged in
  await expect(page.getByText('test@gmail.com')).toBeVisible();

  // 3. Save storage state (cookies & local storage) to a JSON file
  await page.context().storageState({ path: authFile });
});