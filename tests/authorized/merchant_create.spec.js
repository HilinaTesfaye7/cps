
const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {
  // Variable to store the OTP
  let otp = null;

  // Listen for network responses
  page.on('response', async (response) => {
    const url = response.url(); // Get the URL of the response

    // Check if the response URL matches the specific endpoint
    if (url.includes('https://sau.eaglelionsystems.com/v1.0/chatbirrapi/cpsauth/otp/request/dashops')) {
      console.log(`Response URL: ${url}`);

      // Get the response body as JSON
      try {
        const responseBody = await response.json(); // Parse the response body as JSON
        console.log('Response Body:', responseBody);

        // Extract the OTP from the response body
        if (responseBody.otpcode) {
          otp = responseBody.otpcode; // Assuming the OTP is in a field named "otpcode"
          console.log(`OTP: ${otp}`);
        } else {
          console.error('OTP not found in the response body.');
        }
      } catch (error) {
        console.error('Failed to parse response body as JSON:', error);
      }
    }
  });

  // Navigate to the login page
  await page.goto('https://sau-dbsa.vercel.app');

  // Enter the username and request OTP
  await page.getByPlaceholder('Enter Your username').click();
  await page.getByPlaceholder('Enter Your username').fill('binim');
  await page.getByRole('button', { name: 'Get OTP' }).click();

  // Wait for the OTP to be captured (adjust timeout as needed)
  await page.waitForTimeout(5000); // Wait for 5 seconds

  // Check if the OTP was captured
  if (!otp) {
    throw new Error('user not found');
  }

  // Split the OTP into individual digits
  const otpDigits = otp.split('');
  if (otpDigits.length !== 6) {
    throw new Error('OTP must be 6 digits long.');
  }

  // Fill the OTP into the input boxes
  for (let i = 0; i < 6; i++) {
    const inputSelector = `.rizzui-pin-code-field:nth-child(${i + 1})`;
    await page.locator(inputSelector).fill(otpDigits[i]);
  }

  // Click the "Next" button
  await page.getByRole('button', { name: 'Next' }).click();

  // Enter the password and sign in
  await page.getByPlaceholder('Enter Your Password').click();
  await page.getByPlaceholder('Enter Your Password').fill('Admin@7');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByRole('link', { name: 'Merchants Merchants List of' }).click();
  await page.getByRole('button', { name: 'Add Merchant' }).click();
  await page.getByPlaceholder('Account Number').click();
  await page.getByPlaceholder('Account Number').fill('1237141193012');
  await page.locator('form').getByRole('img').click();
  await page.getByPlaceholder('Business Name').click();
  await page.getByPlaceholder('Business Name').fill('cu');
  await page.getByPlaceholder('phone').click();
  await page.getByPlaceholder('phone').fill('947599467');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('kiya@gmail.com');
  await page.locator('.css-1c8xuuf').first().click();
  await page.getByRole('option', { name: 'Airlines' }).click();
  await page.locator('.css-18is6bn-control > .css-hlgwow > .css-1c8xuuf').first().click();
  await page.locator('div:nth-child(3) > div > .text-sm > .css-18is6bn-control > .css-hlgwow > .css-1c8xuuf').click();
  await page.getByRole('option', { name: 'AED' }).click();
  await page.getByPlaceholder('License No').click();
  await page.getByPlaceholder('License No').fill('123456789');
  await page.getByPlaceholder('TinNumber').click();
  await page.getByPlaceholder('TinNumber').fill('12345678');
  await page.locator('div:nth-child(3) > .bg-primary\\/5 > .mt-2 > div > div > .text-sm > .css-18is6bn-control > .css-hlgwow > .css-1c8xuuf').first().click();
  await page.getByRole('option', { name: 'Addis Ababa' }).click();
  await page.locator('div').filter({ hasText: /^TIN No\*tinNumber must be at least 10 characters$/ }).locator('span').nth(1).click();
  await page.getByPlaceholder('TinNumber').fill('1234567890');
  await page.locator('div:nth-child(3) > .bg-primary\\/5 > .mt-2 > div:nth-child(2) > div > .text-sm > .css-18is6bn-control > .css-hlgwow > .css-1c8xuuf').click();
  await page.getByRole('option', { name: 'Gode' }).click();
  await page.getByPlaceholder('Woreda').click();
  await page.getByPlaceholder('Woreda').fill('1');
  await page.getByPlaceholder('Kebele').click();
  await page.getByPlaceholder('Kebele').fill('1');
  await page.getByPlaceholder('Zone').click();
  await page.getByPlaceholder('Zone').fill('1');
  await page.getByPlaceholder('House No').click();
  await page.getByPlaceholder('House No').fill('1611');
  await page.getByPlaceholder('phone').click();
  await page.getByPlaceholder('******').click();
  await page.getByPlaceholder('******').fill('947599467');
  await page.getByPlaceholder('Address').click();
  await page.getByPlaceholder('Address').fill('aa');
  await page.locator('input[name="userEmail"]').click();
  await page.locator('input[name="userEmail"]').fill('kiya@gmail.com');
  await page.getByText('Dashen Bank Super App Central Dashboard PortalBbinimMAKER').click();
  await page.getByRole('button', { name: 'Create' }).click();
});