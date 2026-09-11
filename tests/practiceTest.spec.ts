import { test, expect } from '@playwright/test';
import * as path from 'path'; // Added missing path import

test('string', async ({ page, context }) => {


  //File Upload & download

  await page.goto('https://web-six-beta-34.vercel.app/login')
  await page.getByRole('textbox', { name: 'email' }).fill('test@gmail.com')
  await page.getByRole('textbox', { name: 'password' }).fill('passpass')
  await page.getByRole('button', { name: 'Log in' }).click()
  await expect(page.getByText('test@gmail.com')).toBeVisible()

  await page.getByRole("link", { name: "Transactions", exact: true }).click()
  await page.getByRole("button", { name: "Import CSV", exact: true }).click()

  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.getByText("Click to choose a CSV file", { exact: true }).click()
  const fileChooser = await fileChooserPromise;
  const filePath = path.join(
    'D:',
    'Temp - Sumit',
    'Signature request',
    'Parking_MOU_TestWorkbook_V3.0 - Copy.xlsx'
  );

  await fileChooser.setFiles(filePath);

  // Take a screenshot of the entire visible screen
await page.screenshot({ path: 'screenshots/full-page-upload.png' });


 
await page.getByRole("button", { name: "Close", exact: true }).click();

  await page.close()




  // // Test to download 
  // const downloadPromise = page.waitForEvent('download');

  // await page.getByRole('button', { name: 'Download Template', exact: true }).click();

  // const download = await downloadPromise;

  // // Option A: Save explicitly to C:\Users\<Username>\Downloads
  // const userDownloadsFolder = path.join(process.env.USERPROFILE || '', 'Downloads');
  // const targetSavePath = path.join(userDownloadsFolder, download.suggestedFilename());

  // await download.saveAs(targetSavePath);
  // expect(download.suggestedFilename()).toBeTruthy();


















  //   // Navigate to page
  // await page.goto('https://vinothqaacademy.com/iframe/');
  // // Target the 3rd iframe on the page containing the Registration Form
  // const registrationFrame = page.frameLocator('iframe').nth(2);
  // // Fill out First Name inside the registration frame
  // const firstNameInput = registrationFrame.getByRole('textbox', { name: 'First Name *' });
  // await firstNameInput.fill('Playwright Learner');
  // // Assert input value
  // await expect(firstNameInput).toHaveValue('Playwright Learner');
  // const lastNameInput = registrationFrame.getByRole('textbox', { name: 'Last Name *' })
  // await lastNameInput.fill('TEST END');
  // await expect(lastNameInput).toHaveValue('TEST END')
























  //   // Task 0 - Mouse hover
  //   await page.goto('https://www.amazon.in/')

  //   await page.getByRole('button', { name: 'Continue shopping', exact : true }).click()
  //    await page.getByRole('link', { name: 'Hello, sign in' }).hover()
  //    await page.getByRole('link', { name: 'Sign in', exact : true }).click()
  //     await expect(page.getByText('Sign in or create account')).toBeVisible()

  //

  //  await page.getByText('Sign in or create account').dblclick()
  //   await page.getByText('Sign in or create account').click({button : 'right'})


  //      // Task 1 - Basic Click n Fill
  //     await page.goto('https://web-six-beta-34.vercel.app/login')
  //     await page.getByRole('textbox', { name: 'email' }).fill('test@gmail.com')
  //     await page.getByRole('textbox', { name: 'password' }).fill('passpass')
  //     await page.getByRole('button', { name: 'Log in' }).click()
  //     await expect(page.getByText('test@gmail.com')).toBeVisible()

  //  //  Define source card locator

  //  const dataAndPrivacyButton = page.getByRole('link', { name: 'Data & Privacy' });

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


  // const sourceCard = page.locator('div[draggable="true"]', { hasText: 'Design mockups' });
  // const inProgressColumn = page.getByText('In Progress').locator('xpath=ancestor::div[contains(@class, "rounded")]').first();
  // await sourceCard.dragTo(inProgressColumn);
  // await expect(inProgressColumn).toContainText('2');






















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