import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  async expectLoaded() {
    await expect(this.page.locator('.title')).toHaveText('Your Cart');
  }

  async expectItemPresent(itemName: string) {
    await expect(this.cartItems.filter({ hasText: itemName })).toBeVisible();
  }

  async expectItemNotPresent(itemName: string) {
    await expect(this.cartItems.filter({ hasText: itemName })).toHaveCount(0);
  }

  async getItemCount() { return this.cartItems.count(); }

  async removeItem(itemName: string) {
    await this.cartItems.filter({ hasText: itemName })
      .getByRole('button', { name: 'Remove' }).click();
  }

  async proceedToCheckout() { await this.checkoutButton.click(); }
}
