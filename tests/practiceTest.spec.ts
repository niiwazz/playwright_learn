import { test, expect } from '@playwright/test';
import * as path from 'path'; // Added missing path import

test('string', async ({ page, context }) => {

    // Task 1 
    
    await page.goto('');
    await page.getByRole('link', { name: 'Test Login Page' }).click();
    await page.getByRole('textbox', { name: "username" }).fill('student');
    await page.getByRole('textbox', { name: "password" }).fill('Password123');
    await page.getByRole('button', { name: "Submit" }).click();
    await expect(page.getByText('Congratulations student. You successfully logged in!')).toBeVisible();

    await page.goto('https://practicetestautomation.com/practice-test-exceptions/');
    await page.getByRole('button', { name: "Add" }).click();
    const row2Text = page.getByText('Row 2 was added');
    await expect(row2Text).toBeVisible();
    await page.getByRole('textbox').nth(1).fill('Parotta');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Row 2 was saved')).toBeVisible();

    // Task 2
    await page.goto('https://practicetestautomation.com/courses/');
    const pagePromise = context.waitForEvent('page');
    await page.getByRole('link', { name: 'Enroll in this course on Udemy' }).nth(7).click();
    const newTab = await pagePromise;
    await expect(newTab).toHaveURL('https://www.udemy.com/course/advanced-selenium-grid-and-cloud/?couponCode=AUGUST2026');
    const regexLocator = newTab.getByText(/Become SDET or even Test Automation Architect/i);
    await expect(regexLocator).toBeVisible();

    // Task 3
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.getByRole('link', { name: 'PlaywrightPractice' }).click();
    page.once('dialog', async (dialog) => {
        console.log('Alert Type :', dialog.type());
        console.log('Alert Message :', dialog.message());
        expect(dialog.message()).toContain('I am an alert box!');
        await dialog.accept();
    });
    await page.getByRole('button', { name: 'Simple Alert' }).click();

    page.once('dialog', async (dialog) => {
        console.log('Alert Type :', dialog.type());
        console.log('Alert Message :', dialog.message());
        expect(dialog.message()).toContain('Press a button!');
        await dialog.accept();
    });
    await page.getByRole('button', { name: 'Confirmation Alert' }).click();

    await page.getByRole('textbox', { name: 'username' }).fill('TEST PASS');

    // Task 4
    await page.goto('https://demoqa.com/webtables');
    const targetRow = page.getByRole('row').filter({ hasText: 'kiera' });
    await targetRow.locator('span[title="Edit"]').click(); 
    
    // Task 5: Frames
    await page.goto('https://demoqa.com/webtables');
    await page.getByText('Alerts, Frame & Windows').click();
    await page.getByRole('link', { name: 'Frames', exact: true }).click();
    const frame = page.frameLocator('#frame1');
    const frameHeading = frame.getByRole('heading', { name: 'This is a sample page' });
    await expect(frameHeading).toBeVisible();

    // Task 6: File Upload
    await page.goto('https://demoqa.com/upload-download');

    // Dynamically resolve absolute path to Downloads folder
    // Note: Make sure 'your_image.png' exists in C:\Users\prajan\Downloads\
    const fileName = 'your_image.png'; 
    const filePath = path.join(process.env.USERPROFILE || '', 'Downloads', fileName);

    // Upload file & assert confirmation text
    await page.locator('#uploadFile').setInputFiles(filePath);
    await expect(page.locator('#uploadedFilePath')).toContainText(fileName); 


// Task 7 
    await page.goto('https://web-six-beta-34.vercel.app/login')
    await page.getByRole('textbox', {name : 'email'}).fill('test@gmail.com')
    await page.getByRole('textbox', {name : 'password'}).fill('passpass')
    await page.getByRole('button', {name : 'Log in'}).click()
   // await expect(page.getByText('Dashboard')).toBeVisible()
    await expect(page.getByText('test@gmail.com' )).toBeVisible()
    await page.getByRole('link', {name : 'Goals'}).click()
    await page.getByRole('button', {name : 'Add Goal'}).click()

    // AUtomated by gemini

 


    //await page.getByRole('',{name:'goal_name'}).fill('TEST GOAL NAME')
    //await page.getByRole('textbox',{name:'category'}).fill('TEST CAREGORY NAME')

    
    


});