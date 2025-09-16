class ShopPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.productCards = page.locator('.card');
    this.checkoutButton = page.locator('a.nav-link.btn.btn-primary:has-text("Checkout")');
  }

  async addProductToCart(productName) {
    const cards = await this.page.$$('.card');
    for (const card of cards) {
      const title = await card.$eval('.card-title', el => el.textContent.trim());
      if (title === productName) {
        await card.$eval('button.btn-info', btn => btn.click());
        return true;
      }
    }
    return false;
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { ShopPage };
