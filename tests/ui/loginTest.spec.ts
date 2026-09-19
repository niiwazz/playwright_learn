import { test, expect } from '../../fixtures/pageFixtures';

test('successful login using custom fixtures', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('test@gmail.com', 'passpass');
  await loginPage.verifyLoginSuccess();
});
