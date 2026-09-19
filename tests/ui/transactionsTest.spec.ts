import { test, expect } from '../../fixtures/pageFixtures';
import { TEST_USER } from '../../data/userCredentials';
import { generateTransactionPayload } from '../../data/dynamicFactories';

test('Verify created transaction can be edited and deleted successfully', async ({
  loginPage,
  sideMenuPage,
  transactionsPage,
}) => {
  
  // Setup isolated test payloads
  const initialPayload = generateTransactionPayload();
  const updatedAmount = '450.00';
  const updatedNotes = `${initialPayload.notes}-UPDATED`;

  await test.step('1. Authenticate and navigate to Transactions page', async () => {
    await loginPage.goto();
    await loginPage.login(TEST_USER.email, TEST_USER.password);
    await loginPage.verifyLoginSuccess();
    await sideMenuPage.gotoTransactions();
  });

  await test.step('2. Create initial transaction', async () => {
    await transactionsPage.createTransaction(initialPayload);
    const initialRow = transactionsPage.getTableRowByText(initialPayload.notes);
    await expect(initialRow).toBeVisible();
  });

  await test.step('3. Edit the newly created transaction', async () => {
    await transactionsPage.editTransaction(initialPayload.notes, {
      amount: updatedAmount,
      notes: updatedNotes,
    });
  });

  await test.step('4. Verify updated details reflect in the table', async () => {
    const updatedRow = transactionsPage.getTableRowByText(updatedNotes);
    await expect(updatedRow).toBeVisible();
    await expect(updatedRow).toContainText(updatedAmount);
  });

  await test.step('5. Delete the edited transaction and verify removal', async () => {
    await transactionsPage.deleteTransaction(updatedNotes);
    const deletedRow = transactionsPage.getTableRowByText(updatedNotes);
    await expect(deletedRow).not.toBeVisible();
  });

});