import { test, expect } from '../fixtures/authenticated';

test.describe('Inventory & sorting', () => {
  test('inventory page lists products', async ({ loggedInPage }) => {
    const names = await loggedInPage.inventoryPage.getItemNames();
    expect(names.length).toBeGreaterThan(0);
    expect(names).toContain('Sauce Labs Backpack');
  });

  test('sort by price low to high', async ({ loggedInPage }) => {
    await loggedInPage.inventoryPage.sortBy('lohi');
    const prices = await loggedInPage.inventoryPage.getItemPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('sort by price high to low', async ({ loggedInPage }) => {
    await loggedInPage.inventoryPage.sortBy('hilo');
    const prices = await loggedInPage.inventoryPage.getItemPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('sort by name Z to A', async ({ loggedInPage }) => {
    await loggedInPage.inventoryPage.sortBy('za');
    const names = await loggedInPage.inventoryPage.getItemNames();
    expect(names).toEqual([...names].sort().reverse());
  });
});
