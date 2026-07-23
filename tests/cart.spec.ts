import { test, expect } from '../fixtures/authenticated';
import { CartPage } from '../pages/CartPage';

test.describe('Cart behaviour', () => {
  test('adding an item updates the cart badge', async ({ loggedInPage }) => {
    expect(await loggedInPage.inventoryPage.getCartCount()).toBe(0);
    await loggedInPage.inventoryPage.addItemToCart('Sauce Labs Backpack');
    expect(await loggedInPage.inventoryPage.getCartCount()).toBe(1);
  });

  test('adding multiple items increments badge correctly', async ({ loggedInPage }) => {
    await loggedInPage.inventoryPage.addItemToCart('Sauce Labs Backpack');
    await loggedInPage.inventoryPage.addItemToCart('Sauce Labs Bike Light');
    expect(await loggedInPage.inventoryPage.getCartCount()).toBe(2);
  });

  test('removing an item updates the cart', async ({ loggedInPage }) => {
    await loggedInPage.inventoryPage.addItemToCart('Sauce Labs Backpack');
    await loggedInPage.inventoryPage.removeItemFromCart('Sauce Labs Backpack');
    expect(await loggedInPage.inventoryPage.getCartCount()).toBe(0);
  });

  test('cart page shows added items', async ({ loggedInPage, page }) => {
    await loggedInPage.inventoryPage.addItemToCart('Sauce Labs Backpack');
    await loggedInPage.inventoryPage.openCart();
    const cart = new CartPage(page);
    await cart.expectLoaded();
    await cart.expectItemPresent('Sauce Labs Backpack');
  });

  test('removing item from cart page works', async ({ loggedInPage, page }) => {
    await loggedInPage.inventoryPage.addItemToCart('Sauce Labs Backpack');
    await loggedInPage.inventoryPage.openCart();
    const cart = new CartPage(page);
    await cart.removeItem('Sauce Labs Backpack');
    await cart.expectItemNotPresent('Sauce Labs Backpack');
  });
});
