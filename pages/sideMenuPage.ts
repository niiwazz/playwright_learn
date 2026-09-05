import { Page, Locator, expect } from '@playwright/test';

export class SideMenuPage {
readonly page: Page;

  // Header
  readonly brandLogo: Locator;
  readonly collapseBtn: Locator;

  // Direct Navigation Links
  readonly dashboardLink: Locator;
  readonly transactionsLink: Locator;
  readonly investmentsLink: Locator;
  readonly portfolioLink: Locator;
  readonly calculatorsLink: Locator;
  readonly goalsLink: Locator;
  readonly cashbookLink: Locator;
  readonly insuranceLink: Locator;

  // Dropdown / Accordion Menu Buttons
  readonly assetsMenuBtn: Locator;
  readonly reportsMenuBtn: Locator;
  readonly configMenuBtn: Locator;
  readonly settingsMenuBtn: Locator;

  // Footer / Profile
  readonly userEmail: Locator;
  readonly logoutBtn: Locator;

  // Settings Side Menu Locators
  readonly profileLink: Locator;
  readonly billingLink: Locator;
  readonly preferencesLink: Locator;
  readonly dataPrivacyLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header
    this.brandLogo = page.getByRole('link', { name: 'KashMap' });
    this.collapseBtn = page.getByRole('button').first();

    // Links
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.transactionsLink = page.getByRole('link', { name: 'Transactions' });
    this.investmentsLink = page.getByRole('link', { name: 'Investments' });
    this.portfolioLink = page.getByRole('link', { name: 'Portfolio' });
    this.calculatorsLink = page.getByRole('link', { name: 'Calculators' });
    this.goalsLink = page.getByRole('link', { name: 'Goals' });
    this.cashbookLink = page.getByRole('link', { name: 'Cashbook' });
    this.insuranceLink = page.getByRole('link', { name: 'Insurance' });

    // Menu Accordions
    this.assetsMenuBtn = page.getByRole('button', { name: 'Assets' });
    this.reportsMenuBtn = page.getByRole('button', { name: 'Reports' });
    this.configMenuBtn = page.getByRole('button', { name: 'Config' });
    this.settingsMenuBtn = page.getByRole('button', { name: 'Settings' });

    // Profile Footer
    this.userEmail = page.getByText('test@gmail.com');
    this.logoutBtn = page.getByRole('button').last();

    // Side Menu Accordion & Sub-links
    this.profileLink = page.getByRole('link', { name: 'Profile' });
    this.billingLink = page.getByRole('link', { name: 'Billing' });
    this.preferencesLink = page.getByRole('link', { name: 'Preferences' });
    this.dataPrivacyLink = page.getByRole('link', { name: 'Data & Privacy' });
  }
async gotoTransactions() {
    await this.transactionsLink.click()
  }

  async gotoSettingsPreferences() {
    await this.settingsMenuBtn.click()
    await this.preferencesLink.click()
  }

  async gotoinvestmentsPage(){
    await this.investmentsLink.click()
  }



}