import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://sau-dbsa.vercel.app/auth/signin?callbackUrl=%2Fmerchants%2Freject%2F67de16ee6c60850a40d5c3ef');
  await page.locator('span').first().click();
  await page.getByRole('textbox', { name: 'Get OTP' }).fill('binim');
  await page.getByText('LoginWelcome to Dashen bank centeral portal service!UsernameGet OTPOTP').click({
    button: 'right'
  });
  await page.getByRole('button', { name: 'Get OTP' }).click();
  await page.locator('.rizzui-pin-code-field').first().click();
  await page.locator('input:nth-child(6)').click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('span').nth(1).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Admin@7');
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Merchants Merchants List of' }).click();
  await page.getByPlaceholder('Search...').click();
  await page.getByPlaceholder('Search...').fill('cu');
  await page.getByPlaceholder('Search...').press('Enter');
  await page.getByRole('button').nth(3).click();
  await page.getByRole('link').nth(3).click();
  await page.locator('div').filter({ hasText: /^Merchant Name$/ }).locator('span').click();
  await page.getByPlaceholder('Business Name').fill('cuuu');
  await page.getByPlaceholder('Zone').click();
  await page.getByPlaceholder('Zone').fill('12');
  await page.locator('div').filter({ hasText: /^Kebele$/ }).locator('span').click();
  await page.getByPlaceholder('Kebele').fill('15');
  await page.locator('.css-1c8xuuf').first().click();
  await page.getByRole('option', { name: 'Clothing Stores' }).click();
  await page.locator('.css-18is6bn-control > .css-hlgwow > .css-1c8xuuf').first().click();
  await page.getByRole('option', { name: 'Women’s Accessory and' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
});