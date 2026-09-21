// tests/setup/auth.setup.ts
import { test as setup, expect } from '@playwright/test';
import * as path from 'path';

// Points directly to root playwright-learn/.auth/user.json
const authFile = path.resolve(__dirname, '../../.auth/user.json');

setup('authenticate', async ({ page }) => {
  // 1. Perform UI login (uses relative path since baseURL is in config)
  await page.goto('/login');
  await page.getByRole('textbox', { name: 'email' }).fill('test@gmail.com');
  await page.getByRole('textbox', { name: 'password' }).fill('passpass');
  await page.getByRole('button', { name: 'Log in' }).click();

  // 2. Wait until the user is fully logged in
  await expect(page.getByText('test@gmail.com')).toBeVisible();

  // 3. Save storage state directly to root .auth/user.json
  await page.context().storageState({ path: authFile });
});