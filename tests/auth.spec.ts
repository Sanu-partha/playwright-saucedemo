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

  test.describe('Basic Functionality', () => {

    test('valid username and valid password logs in successfully', async ({ page }) => {
      await loginPage.login(users.standard.username, users.standard.password);
      const inventory = new InventoryPage(page);
      await inventory.expectLoaded();
      await expect(page).toHaveURL(/inventory\.html/);
    });

    test('invalid username and valid password is rejected', async () => {
      await loginPage.login('not_a_real_user', users.standard.password);
      await loginPage.expectError(/Username and password do not match/i);
    });

    test('valid username and invalid password is rejected', async () => {
      await loginPage.login(users.standard.username, 'wrong_password');
      await loginPage.expectError(/Username and password do not match/i);
    });

    test('invalid username and invalid password is rejected', async () => {
      await loginPage.login('not_a_real_user', 'wrong_password');
      await loginPage.expectError(/Username and password do not match/i);
    });

    test('empty username and empty password shows error', async () => {
      await loginPage.login('', '');
      await loginPage.expectError(/Username is required/i);
    });

    test('empty username with valid password shows error', async () => {
      await loginPage.login('', users.standard.password);
      await loginPage.expectError(/Username is required/i);
    });

    test('valid username with empty password shows error', async () => {
      await loginPage.login(users.standard.username, '');
      await loginPage.expectError(/Password is required/i);
    });

  });

  test.describe('Field Validation', () => {

    test('password field masks input with asterisks', async ({ page }) => {
      await page.getByPlaceholder('Password').fill('secret_sauce');
      const inputType = await page.getByPlaceholder('Password').getAttribute('type');
      expect(inputType).toBe('password');
    });

    test('username with minimum length one character is accepted', async () => {
      await loginPage.login('a', 'wrong_password');
      await loginPage.expectError(/Username and password do not match/i);
    });

    test('special characters in username are handled', async () => {
      await loginPage.login('!@#$%^&*()', 'wrong_password');
      await loginPage.expectError(/Username and password do not match/i);
    });

    test('special characters in password are handled', async () => {
      await loginPage.login(users.standard.username, '!@#$%^&*()');
      await loginPage.expectError(/Username and password do not match/i);
    });

    test('error message is visible and readable on failed login', async () => {
      await loginPage.login('wrong_user', 'wrong_pass');
      await loginPage.expectError(/Username and password do not match/i);
    });

  });

});