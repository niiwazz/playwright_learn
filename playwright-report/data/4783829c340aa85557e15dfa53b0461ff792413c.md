# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.setup.ts >> authenticate
- Location: tests\auth.setup.ts:8:6

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('test@gmail.com')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('test@gmail.com')

```

```yaml
- banner:
  - navigation:
    - link "KashMap KashMap":
      - /url: /
      - img "KashMap"
      - text: KashMap
    - link "Features":
      - /url: /features
    - link "Reports":
      - /url: /reports-overview
    - link "Pricing":
      - /url: /pricing
    - button "Toggle theme"
    - link "Log in":
      - /url: /login
    - link "Get started free":
      - /url: /signup
- text: Log in Welcome back to your finance tracker. Email
- textbox "Email":
  - /placeholder: you@example.com
  - text: test@gail.com
- text: Password
- link "Forgot password?":
  - /url: /forgot-password
- textbox "Password": passpass
- button "Show password"
- paragraph: Invalid login credentials
- button "Log in"
- text: Or continue with
- button "Google"
- paragraph:
  - text: Don't have an account?
  - link "Sign up":
    - /url: /signup
- region "Notifications alt+T"
- alert
```

# Test source

```ts
  1  | // tests/auth.setup.ts
  2  | import { test as setup, expect } from '@playwright/test';
  3  | import * as path from 'path';
  4  | 
  5  | // Define the file path where the auth state will be stored
  6  | const authFile = path.join(__dirname, '../.auth/user.json');
  7  | 
  8  | setup('authenticate', async ({ page }) => {
  9  |   // 1. Perform UI login once
  10 |   await page.goto('https://web-six-beta-34.vercel.app/login');
  11 |   await page.getByRole('textbox', { name: 'email' }).fill('test@gail.com');
  12 |   await page.getByRole('textbox', { name: 'password' }).fill('passpass');
  13 |   await page.getByRole('button', { name: 'Log in' }).click();
  14 | 
  15 |   // 2. Wait until the user is fully logged in
> 16 |   await expect(page.getByText('test@gmail.com')).toBeVisible();
     |                                                  ^ Error: expect(locator).toBeVisible() failed
  17 | 
  18 |   // 3. Save storage state (cookies & local storage) to a JSON file
  19 |   await page.context().storageState({ path: authFile });
  20 | });
```