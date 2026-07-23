import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../test-data/users';

test.describe('Authentication', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('valid user can log in and reach inventory', async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    const inventory = new InventoryPage(page);
    await inventory.expectLoaded();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('locked-out user sees a clear error message', async () => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await loginPage.expectError(/locked out/i);
  });

  test('invalid credentials are rejected', async () => {
    await loginPage.login('not_a_real_user', 'wrong_password');
    await loginPage.expectError(/Username and password do not match/i);
  });

  test('empty username shows validation error', async () => {
    await loginPage.login('', 'secret_sauce');
    await loginPage.expectError(/Username is required/i);
  });

  test('empty password shows validation error', async () => {
    await loginPage.login('standard_user', '');
    await loginPage.expectError(/Password is required/i);
  });
});
