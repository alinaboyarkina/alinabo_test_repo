import { expect } from '@playwright/test';
import { Category } from '../enums/categories';
import { test } from '../fixtures';

test('Verify filter by category: Sander with allPages and fixture', { tag: '@smoke' }, async ({ app, }) => {
  test.skip(process.env.CI === 'true', 'Skipped in CI');

  await app.homePage.open();

  await app.homePage.categoryByName(Category.Sander).check();

  const firstNameBefore = await app.homePage.productNameField.first().textContent();

  await expect.poll(async () =>
    await app.homePage.productNameField.first().textContent()
  ).not.toBe(firstNameBefore);

  const productNames = await app.homePage.productNameField.allTextContents();

  for (const name of productNames) {
    expect(name).toContain(Category.Sander);
  }
});
