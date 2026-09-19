import { test, expect } from '../../fixtures/pageFixtures';
import { TEST_USER } from '../../data/userCredentials';
import { generateInvestmentPayload } from '../../data/dynamicFactories';

test('Verify created investment record can be edited and deleted successfully', async ({
  loginPage,
  sideMenuPage,
  investmentsPage,
}) => {
  const initialPayload = generateInvestmentPayload();
  const updatedPrice = '2750.00';
  const updatedNotes = `${initialPayload.notes}-UPDATED`;

  await test.step('1. Authenticate and navigate to Investments page', async () => {
    await loginPage.goto();
    await loginPage.login(TEST_USER.email, TEST_USER.password);
    await loginPage.verifyLoginSuccess();
    await sideMenuPage.gotoinvestmentsPage();
  });

  await test.step('2. Create initial investment record', async () => {
    await investmentsPage.createInvestment(initialPayload);
    // Target row using visible table text (symbol)
    const initialRow = investmentsPage.getTableRowByText(initialPayload.symbol);
    await expect(initialRow).toBeVisible();
  });

  await test.step('3. Edit the newly created investment', async () => {
    await investmentsPage.editInvestment(initialPayload.symbol, {
      price: updatedPrice,
      notes: updatedNotes,
    });
  });

  await test.step('4. Verify updated details reflect in table', async () => {
    const updatedRow = investmentsPage.getTableRowByText(initialPayload.symbol);
    await expect(updatedRow).toBeVisible();
    await expect(updatedRow).toContainText('2,750.00'); // Matches formatted table currency
  });

  await test.step('5. Delete the investment record and verify removal', async () => {
    await investmentsPage.deleteInvestment(initialPayload.symbol);
    const deletedRow = investmentsPage.getTableRowByText(initialPayload.symbol);
    await expect(deletedRow).not.toBeVisible();
  });
});