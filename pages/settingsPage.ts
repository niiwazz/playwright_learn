import { Page, Locator, expect } from '@playwright/test';

export class SettingsPage {
  readonly page: Page;
  readonly themeToggleBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.themeToggleBtn = page.getByRole('button', { name: /Switch to (Light|Dark)/i });  }



async toggleTheme() {
    await this.themeToggleBtn.click();
  }

  
}