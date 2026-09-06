import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { TransactionsPage } from '../pages/transactionsPage';
import { SideMenuPage } from '../pages/sideMenuPage';
import { SettingsPage } from '../pages/settingsPage';
import { InvestmentsPage } from '../pages/investmentsPage';
import { GoalsPage } from '../pages/goalsPage';



// Define the types of custom fixtures we are adding
type MyFixtures = {
  loginPage: LoginPage;
  transactionsPage: TransactionsPage;
  sideMenuPage: SideMenuPage;
  settingsPage: SettingsPage;
  investmentsPage : InvestmentsPage;
  goalsPage : GoalsPage;

};

// Extend the base test with our custom fixture
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    // Set up: instantiate the page object
    const loginPage = new LoginPage(page);

    // Pass the fixture instance into the test
    await use(loginPage);
  },
  transactionsPage: async ({ page }, use) => {
    const transactionsPage = new TransactionsPage(page);
    await use(transactionsPage);
  },
  sideMenuPage: async ({ page }, use) => {
    const sideMenuPage = new SideMenuPage(page);
    await use(sideMenuPage);
  },

  settingsPage: async ({ page }, use) => {
    const settingsPage = new SettingsPage(page);
    await use(settingsPage);
  },
   investmentsPage: async ({ page }, use) => {
    const investmentsPage = new InvestmentsPage(page);
    await use(investmentsPage);
  },
   goalsPage: async ({ page }, use) => {
    const goalsPage = new GoalsPage(page);
    await use(goalsPage);
   }
});

export { expect } from '@playwright/test';