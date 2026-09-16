import { test, expect } from '@playwright/test';

test.skip('Verify UI renders empty state when API returns no transactions', async ({ page }) => {
  // Target the Supabase transactions endpoint shown in Network tab
  await page.route('**/transactions?select=*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]), // Return empty array
    });
  });

  await page.goto('/transactions');

  // Verify that zero data rows appear in the UI
  const tableRows = page.locator('table tbody tr');
  await expect(tableRows).toHaveCount(0);
});

test('Bypass UI login using mocked session for non-existing user', async ({ page }) => {
  // 1. Intercept the authentication session/user check
  await page.route('**/auth/v1/user*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 'fake-user-999',
        email: 'fake.unexisting.user@test.com',
        role: 'authenticated',
      }),
    });
  });

  // 2. Direct navigation to a protected page (e.g., /dashboard or /transactions)
  await page.goto('/transactions');

  // 3. Verify you bypassed login and arrived at the protected page
  await expect(page.getByRole('heading', { name: 'Transactions' })).toBeVisible();
});

