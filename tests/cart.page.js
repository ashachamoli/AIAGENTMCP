class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.cartItem = page.locator('.media-body h4.media-heading a');
    this.successCheckoutButton = page.locator('button.btn.btn-success');
  }

  async isProductInCart(productName) {
    await this.page.waitForSelector('.media-body h4.media-heading a', { timeout: 20000 });
    const cartItemText = await this.cartItem.textContent();
    return cartItemText.trim() === productName;
  }

  async checkout() {
    await this.successCheckoutButton.click();
  }
}

module.exports = { CartPage };
