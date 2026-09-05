import { test, expect } from '../fixtures/pageFixtures';
import { TEST_USER } from '../data/userCredentials';
import { generateTransactionPayload } from '../data/dynamicFactories';

test('successful login using custom fixtures', async ({ loginPage,investmentsPage,sideMenuPage }) => {
  await loginPage.goto();
  await loginPage.login(TEST_USER.email, TEST_USER.password);
  await loginPage.verifyLoginSuccess();
  await sideMenuPage.gotoinvestmentsPage();
  // Setup isolated test payloads
  const initialPayload = generateTransactionPayload();
  const updatedAmount = '450.00';
  const updatedNotes = `${initialPayload.notes}-UPDATED`;
});
