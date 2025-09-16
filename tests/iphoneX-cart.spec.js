const { test, expect } = require('@playwright/test');
const { ShopPage } = require('./shop.page');
const { CartPage } = require('./cart.page');

test('Login, add iPhone X to cart, and checkout', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  // Fill in login credentials
  await page.fill('#username', 'rahulshettyacademy');
  await page.fill('#password', 'learning');
  await page.click('#signInBtn');

  // Wait for navigation to products page
  await page.waitForURL('**/shop');

  const productName = 'iphone X';
  const shopPage = new ShopPage(page);
  const added = await shopPage.addProductToCart(productName);
  expect(added).toBeTruthy();

  await shopPage.goToCheckout();

  const cartPage = new CartPage(page);
  const inCart = await cartPage.isProductInCart(productName);
  expect(inCart).toBeTruthy();

  await cartPage.checkout();
});