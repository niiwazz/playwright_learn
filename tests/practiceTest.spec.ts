import { test, expect } from '@playwright/test';
import * as path from 'path'; // Added missing path import

test('string', async ({ page, context }) => {

  // Task 0 - Mouse hover
  await page.goto('https://www.amazon.in/')

  await page.getByRole('button', { name: 'Continue shopping', exact : true }).click()
   await page.getByRole('link', { name: 'Hello, sign in' }).hover()
   await page.getByRole('link', { name: 'Sign in', exact : true }).click()
    await expect(page.getByText('Sign in or create account')).toBeVisible()

    //




  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
//     // Task 1 - Basic Click n Fill
//     await page.goto('https://web-six-beta-34.vercel.app/login')
//     await page.getByRole('textbox', { name: 'email' }).fill('test@gmail.com')
//     await page.getByRole('textbox', { name: 'password' }).fill('passpass')
//     await page.getByRole('button', { name: 'Log in' }).click()
//     await expect(page.getByText('test@gmail.com')).toBeVisible()

//    // Task 2 - Basic Drop down & Fill
//     await page.getByRole('link', { name: 'Transactions', exact: true }).click();
//     const addTransactionDialog = page.getByRole('dialog');
//     await page.getByRole('button', { name: 'Add Transaction' }).click();
//     await expect(addTransactionDialog).toBeVisible();
//     await addTransactionDialog.getByRole('combobox', { name: 'Type' }).click()
//    await page.getByRole('option', { name: 'Income', exact: true }).click();
//     await addTransactionDialog.getByRole('button', { name: /Sep|Date/i }).click();
//     await page.getByRole('button', { name: '15', exact: true }).click();
//     await addTransactionDialog.getByRole('spinbutton', { name: 'Amount' }).fill('2500');
//     await addTransactionDialog.getByRole('combobox', { name: 'Category' }).click();
//     await page.getByRole('option', { name: 'Dividend', exact: true }).click();
//     await addTransactionDialog.getByRole('combobox', { name: 'From Account' }).click();
//     await page.getByRole('option', { name: 'Zerodha (Trading)', exact: true }).click();
//     await addTransactionDialog.getByRole('textbox', { name: 'Sub Category' }).fill('TEST SUB CATEGORY');
//     await addTransactionDialog.getByPlaceholder('Optional notes').fill('Automated transaction test');
//     await addTransactionDialog.getByRole('button', { name: 'Save Transaction' }).click();
//     await expect(addTransactionDialog).toBeHidden();


//     // Task 3 - Auto Waits to be implemented 
//     await page.getByRole('button', { name: 'Setting' }).click()
//     await page.getByRole('link', { name: 'Profile' }).click()
//     await page.getByRole('button', { name: 'Save Profile' }).click()
//     await expect(page.getByText('Emergency Fund')).toBeVisible()

//     // Task 4 - for New tab
//     await page.getByRole('button', { name: "help" }).click()
//     await page.getByRole('link', { name: "donate" }).click()
//     const pagePromise = context.waitForEvent('page')
//     await page.getByRole('link', { name: "Buy me a coffee" , exact : true }).click()
//     const newTab = await pagePromise
//     await expect(newTab).toHaveURL('https://buymeacoffee.com/sibi24sibi5')
//     await page.bringToFront()
//     await page.waitForTimeout(2000)


//    // Task 5 - JS Alert / Easter Egg
// const dataAndPrivacyButton = page.getByRole('link', { name: 'Data & Privacy' });

// if (await dataAndPrivacyButton.isVisible()) {
//   await dataAndPrivacyButton.click();
// } else {
//   await page.getByRole('button', { name: 'Settings' }).click();
//   await page.getByRole('link', { name: 'Data & Privacy' }).click();
// }

// const deleteAccountCard = page.locator('div').filter({
//   has: page.getByRole('heading', { name: 'Delete account' }),
// });

// await deleteAccountCard.getByText('in', { exact: true }).click();
// await deleteAccountCard.getByText('it', { exact: true }).click();
// await deleteAccountCard.getByText('in', { exact: true }).click();
// await deleteAccountCard.getByText('it', { exact: true }).click();
    
//     page.once('dialog', async (dialog) => {
//         console.log('Alert Type :', dialog.type());
//         console.log('Alert Message :', dialog.message());
//         expect(dialog.message()).toContain('This is a simple alert.');
//         await dialog.accept();
//     });
//     await page.getByRole('button', { name: 'Simple Alert' }).click();



//   await page.close

    


});