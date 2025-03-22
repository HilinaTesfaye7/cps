
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
  await page.getByPlaceholder('Enter Your username').fill('binic');
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

  await page.getByRole('button', { name: 'Reject', exact: true }).click();
  await page.getByPlaceholder('Screen reader only').fill('hhd');
  
  const modalRejectButton = page.locator('[id^="headlessui-dialog"]').getByRole('button', { name: 'Reject' });
  await modalRejectButton.waitFor({ state: 'visible' });
  await modalRejectButton.scrollIntoViewIfNeeded();
  await modalRejectButton.click();
  
});