import { Page, Locator, expect } from '@playwright/test';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('.inventory_item');
  }

  async expectLoaded() { await expect(this.title).toHaveText('Products'); }

  async addItemToCart(itemName: string) {
    await this.inventoryItems.filter({ hasText: itemName })
      .getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeItemFromCart(itemName: string) {
    await this.inventoryItems.filter({ hasText: itemName })
      .getByRole('button', { name: 'Remove' }).click();
  }

  async getCartCount(): Promise<number> {
    if (await this.cartBadge.count() === 0) return 0;
    return parseInt(await this.cartBadge.textContent() ?? '0', 10);
  }

  async sortBy(option: SortOption) { await this.sortDropdown.selectOption(option); }

  async getItemPrices(): Promise<number[]> {
    const prices = await this.page.locator('.inventory_item_price').allTextContents();
    return prices.map(p => parseFloat(p.replace('$', '')));
  }

  async getItemNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async openCart() { await this.cartLink.click(); }
}
