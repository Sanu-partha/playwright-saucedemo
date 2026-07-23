import { test, expect } from '../fixtures/authenticated';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout flow', () => {
  test('complete happy-path purchase', async ({ loggedInPage, page }) => {
    await loggedInPage.inventoryPage.addItemToCart('Sauce Labs Backpack');
    await loggedInPage.inventoryPage.openCart();
    const cart = new CartPage(page);
    await cart.proceedToCheckout();
    const checkout = new CheckoutPage(page);
    await checkout.fillInformation({ firstName: 'Test', lastName: 'User', postalCode: '600001' });
    await checkout.finishOrder();
    await checkout.expectOrderComplete();
  });

  test('checkout requires first name', async ({ loggedInPage, page }) => {
    await loggedInPage.inventoryPage.addItemToCart('Sauce Labs Backpack');
    await loggedInPage.inventoryPage.openCart();
    await new CartPage(page).proceedToCheckout();
    const checkout = new CheckoutPage(page);
    await checkout.fillInformation({ firstName: '', lastName: 'User', postalCode: '600001' });
    await checkout.expectError(/First Name is required/i);
  });

  test('checkout requires last name', async ({ loggedInPage, page }) => {
    await loggedInPage.inventoryPage.addItemToCart('Sauce Labs Backpack');
    await loggedInPage.inventoryPage.openCart();
    await new CartPage(page).proceedToCheckout();
    const checkout = new CheckoutPage(page);
    await checkout.fillInformation({ firstName: 'Test', lastName: '', postalCode: '600001' });
    await checkout.expectError(/Last Name is required/i);
  });
});
