import { test, expect } from '@playwright/test';

test('Verify UI renders empty state when API returns no transactions', async ({ page }) => {
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
