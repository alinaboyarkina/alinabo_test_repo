import { expect } from '@playwright/test'
import { test } from '../fixtures';
import { mockProductsRoute } from '../mocks/products.route';

test('`Verify 20 products are displayed per page', async ({ apiLoggedInApp }) => {
    const expectedCount = 20;
    await mockProductsRoute(apiLoggedInApp.page, expectedCount);
    await apiLoggedInApp.page.goto('/');
    const expectProducts = apiLoggedInApp.homePage.productCard;
    await expect(expectProducts).toHaveCount(expectedCount);
});
