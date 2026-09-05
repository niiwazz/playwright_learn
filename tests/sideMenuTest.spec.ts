import { test, expect } from '../fixtures/pageFixtures';

test('side Menu Switch & crash', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('test@gmail.com', 'passpass');
  await loginPage.verifyLoginSuccess();
  
});
