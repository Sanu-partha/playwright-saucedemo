import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../test-data/users';

export const test = base.extend<{
  loggedInPage: { inventoryPage: InventoryPage };
}>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectLoaded();
    await use({ inventoryPage });
  },
});

export { expect };
