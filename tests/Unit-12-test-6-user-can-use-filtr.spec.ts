import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { Category } from '../enums/categories';

test('Verify filter by category: Sander', async ({ page }) => {

  const homePage = new HomePage(page);

  await page.goto('/');

  await homePage.categoryByName(Category.Sander).check();

  const firstNameBefore = await homePage.productNameField.first().textContent();

  await expect.poll(async () =>
    await homePage.productNameField.first().textContent()
  ).not.toBe(firstNameBefore);

  const productNames = await homePage.productNameField.allTextContents();

  console.log('Products after filtering:', productNames);

  for (const name of productNames) {
    expect(name).toContain(Category.Sander);
  }
});
