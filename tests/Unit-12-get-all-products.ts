import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

  test('Verify page products', async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto('/');
  
  const products = await homePage.getAllProducts();
  
  expect(products.length).toBeGreaterThan(0);
  console.table(products); // Виведе гарну таблицю в консоль
});