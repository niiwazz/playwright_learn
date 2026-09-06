import { test, expect } from '../fixtures/pageFixtures';
import { TEST_USER } from '../data/userCredentials';
import { generateGoalPayload } from '../data/dynamicFactories';

test('Verify created goal can be edited and deleted successfully', async ({
  loginPage,
  sideMenuPage,
  goalsPage,
}) => {
  const initialPayload = generateGoalPayload();
  const updatedGoalName = `${initialPayload.goalName}-UPDATED`;
  const updatedTargetAmount = '150000';

  await test.step('1. Authenticate and navigate to Goals page', async () => {
    await loginPage.goto();
    await loginPage.login(TEST_USER.email, TEST_USER.password);
    await loginPage.verifyLoginSuccess();
    await sideMenuPage.gotoGoals();
  });

  await test.step('2. Create initial goal', async () => {
    await goalsPage.createGoal(initialPayload);
    const initialItem = goalsPage.getGoalItemByText(initialPayload.goalName);
    await expect(initialItem).toBeVisible();
  });

  await test.step('3. Edit the newly created goal', async () => {
    await goalsPage.editGoal(initialPayload.goalName, {
      goalName: updatedGoalName,
      targetAmount: updatedTargetAmount,
    });
  });

  await test.step('4. Verify updated details reflect on UI', async () => {
    const updatedItem = goalsPage.getGoalItemByText(updatedGoalName);
    await expect(updatedItem).toBeVisible();
  });

  await test.step('5. Delete the goal and verify removal', async () => {
    await goalsPage.deleteGoal(updatedGoalName);
    const deletedItem = goalsPage.getGoalItemByText(updatedGoalName);
    await expect(deletedItem).not.toBeVisible();
  });
});