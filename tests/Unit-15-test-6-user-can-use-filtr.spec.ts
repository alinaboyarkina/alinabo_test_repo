import { expect } from '@playwright/test';
import { Category } from '../enums/categories';
import { test } from '../fixtures';

test('Verify filter by category: Sander with allPages and fixture', { tag: '@smoke' }, async ({ app }) => {
  test.skip(process.env.CI === 'true', 'Skipped in CI');

  await test.step('Open home page', async () => {
    await app.homePage.open();
  });

  await test.step(`Apply category filter: ${Category.Sander}`, async () => {
    await app.homePage.categoryByName(Category.Sander).check();
  });
  
  const firstNameBefore = await test.step('Capture first product name before filtering update', async () => { 
    return await app.homePage.productNameField.first().textContent(); 
  });

  await test.step('Wait for product list to update after filtering', async () => {
    await expect.poll(async () =>
      await app.homePage.productNameField.first().textContent()
    ).not.toBe(firstNameBefore);
  });

  await test.step('Verify all displayed products belong to selected category', async () => {
    
    const productNames = await app.homePage.productNameField.allTextContents();

    for (const name of productNames) {
      expect(name).toContain(Category.Sander);
    }
  });
});
