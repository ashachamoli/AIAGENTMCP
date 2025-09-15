const { test, expect } = require('@playwright/test');

test('Login, add iPhone X to cart, and checkout', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  // Fill in login credentials
  await page.fill('#username', 'rahulshettyacademy');
  await page.fill('#password', 'learning');
  await page.click('#signInBtn');

  // Wait for navigation to products page
  await page.waitForURL('**/shop');

  // Select iPhone X product and add to cart
  const productName = 'iphone X';
  const cards = await page.$$('.card');
  let found = false;
  for (const card of cards) {
    const title = await card.$eval('.card-title', el => el.textContent.trim());
    if (title === productName) {
      await card.click('text=Add');
      found = true;
      break;
    }
  }
  expect(found).toBeTruthy();

  // Go to cart
  await page.click('a.nav-link.btn.btn-primary');

  // Confirm product is in cart
  const cartItem = page.locator('h4.media-heading', { hasText: productName });
  await expect(cartItem).toBeVisible();

  // Checkout
  await page.click('button.btn.btn-success');

  // Confirm checkout page
  await expect(page.locator('h2')).toHaveText('Thank you for your order!');
});
