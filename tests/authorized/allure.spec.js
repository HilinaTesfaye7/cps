const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');

test('test', async ({ page }) => {
  allure.severity('critical');
  allure.epic('Authentication');
  allure.feature('Login');

  let otp = null;

  await test.step('Listen for OTP response', async () => {
    page.on('response', async (response) => {
      const url = response.url();

      if (url.includes('https://sau.eaglelionsystems.com/v1.0/chatbirrapi/cpsauth/otp/request/dashops')) {
        console.log(`Response URL: ${url}`);

        try {
          const responseBody = await response.json();
          console.log('Response Body:', responseBody);

          if (responseBody.otpcode) {
            otp = responseBody.otpcode;
            console.log(`OTP: ${otp}`);
          } else {
            console.error('OTP not found in the response body.');
          }
        } catch (error) {
          console.error('Failed to parse response body as JSON:', error);
        }
      }
    });
  });

  await test.step('Navigate to login page', async () => {
    await page.goto('https://sau-dbsa.vercel.app');
  });

  await test.step('Enter username and request OTP', async () => {
    await page.getByPlaceholder('Enter Your username').click();
    await page.getByPlaceholder('Enter Your username').fill('binim');
    await page.getByRole('button', { name: 'Get OTP' }).click();
  });

  await page.waitForTimeout(5000); // Wait for OTP response

  await test.step('Verify OTP and enter it', async () => {
    if (!otp) {
      throw new Error('User not found');
    }

    const otpDigits = otp.split('');
    if (otpDigits.length !== 6) {
      throw new Error('OTP must be 6 digits long.');
    }

    for (let i = 0; i < 6; i++) {
      const inputSelector = `.rizzui-pin-code-field:nth-child(${i + 1})`;
      await page.locator(inputSelector).fill(otpDigits[i]);
    }
  });

  await test.step('Submit login form', async () => {
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByPlaceholder('Enter Your Password').fill('Admin@7');
    await page.getByRole('button', { name: 'Sign In' }).click();
  });
});
