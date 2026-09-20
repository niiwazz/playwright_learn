// tests/apiTesting/apiTesting.spec.ts
import { test, expect } from '@playwright/test';

test.use({ storageState: '.auth/user.json' });

test('Create transaction via Pure API POST (Zero UI filling) and verify on UI', async ({ request, page }) => {
  // Read credentials from process.env
  const SUPABASE_URL = process.env.SUPABASE_URL!;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;

  // 1. Obtain JWT access token and user ID directly from Supabase Auth API
  const authResponse = await request.post(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
    },
    data: {
      email: 'test@gmail.com',
      password: 'passpass',
    },
  });

  await expect(authResponse, 'Auth request should succeed').toBeOK();
  const authData = await authResponse.json();
  const authHeader = {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${authData.access_token}`,
    'Prefer': 'return=representation',
  };

  // 2. Fetch a valid account ID from the user's accounts table
  const accountsResponse = await request.get(`${SUPABASE_URL}/rest/v1/accounts?select=id,name`, {
    headers: authHeader,
  });
  await expect(accountsResponse, 'Fetching accounts should succeed').toBeOK();
  const accounts = await accountsResponse.json();

  const cashAccount = accounts.find((a: any) => a.name === 'Cash') || accounts[0];
  expect(cashAccount?.id, 'User must have at least one valid account').toBeTruthy();

  // 3. Post transaction using valid foreign key from_account_id
  const uniqueNote = `Pure API Transaction ${Date.now()}`;
  const dbResponse = await request.post(`${SUPABASE_URL}/rest/v1/transactions`, {
    headers: authHeader,
    data: {
      user_id: authData.user.id,
      from_account_id: cashAccount.id,
      type: 'Expense',
      amount: 1250,
      notes: uniqueNote,
      date: '2026-09-20',
    },
  });

  await expect(dbResponse, 'Database transaction creation should succeed').toBeOK();

  // 4. Open UI page and confirm the API-seeded record renders in the table
  await page.goto('/transactions');
  await expect(page.getByText(uniqueNote)).toBeVisible();
  await expect(page.getByText('₹1,250.00')).toBeVisible();
});