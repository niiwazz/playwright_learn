import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly profileName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', {name : 'email'})
    this.passwordInput = page.getByRole('textbox', {name : 'password'})
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.profileName = page.getByText('test@gmail.com' )
  }


  async goto() {
    await this.page.goto('https://web-six-beta-34.vercel.app/login');
  }

  async login(username: string, pass: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }

  async verifyLoginSuccess() {
    await expect(this.profileName).toBeVisible();

  
  }
}