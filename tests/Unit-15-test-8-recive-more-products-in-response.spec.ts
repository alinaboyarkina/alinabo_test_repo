import { expect } from '@playwright/test'
import { test } from '../fixtures';
import { mockProductsRoute } from '../mocks/products.route';

test('`Verify 20 products are displayed per page', { tag: '@smoke' }, async ({ apiLoggedInApp }) => {

    const expectedCount = 20;
    
    await test.step('Mock products API to return 20 items', async () => {
        await mockProductsRoute(apiLoggedInApp.page, expectedCount);
    });
    
    await test.step('Open home page', async () => {
        await apiLoggedInApp.homePage.open();
    });

    await test.step('Verify exactly 20 product cards are displayed', async () => {    
        const expectProducts = apiLoggedInApp.homePage.productCard;
        await expect(expectProducts).toHaveCount(expectedCount);
    });
});



