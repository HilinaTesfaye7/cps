import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://sau-dbsa.vercel.app/auth/signin?callbackUrl=%2Fchecker-portal');
  await page.getByRole('textbox', { name: 'Get OTP' }).click();
  await page.getByRole('textbox', { name: 'Get OTP' }).fill('bini');
  await page.getByText('LoginWelcome to Dashen bank').click({
    button: 'right'
  });
  await page.locator('span').first().click();
  await page.getByRole('textbox', { name: 'Get OTP' }).fill('binim');
  await page.getByRole('button', { name: 'Get OTP' }).click();
  await page.locator('.rizzui-pin-code-field').first().click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Admin@7');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Budget Settings Budget' }).click();
  await page.locator('div').filter({ hasText: /^List of Icons$/ }).getByRole('img').click();
  await page.locator('path:nth-child(3)').click();
  // Upload Image
const filePath = 'C:\\Users\\ENVY\\Documents\\cps\\kk.png'; // Use double backslashes but no extra quotes around the path
const fileChooserPromise = page.waitForEvent('filechooser');
await page.getByText('Drop or select file').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(filePath);
console.log('✅ Image uploaded successfully');

  await page.getByRole('button', { name: 'Submit' }).click();
});