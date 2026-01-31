import { expect } from '@playwright/test'
import { test } from '../fixtures';
import { mockProductsRoute } from '../mocks/products.route';

test('`Verify 20 products are displayed per page', async ({ apiLoggedInApp }) => {

    const expectedCount = 20;
    
    await mockProductsRoute(apiLoggedInApp.page, expectedCount);
    await apiLoggedInApp.homePage.open();

    const expectProducts = apiLoggedInApp.homePage.productCard;

    //await expect(expectProducts).toHaveCount(expectedCount)
    await expect.poll(async () => { 
        return await expectProducts.count(); 
    }, { 
        timeout: 7000, 
    }).toBe(expectedCount);

    // for (let i = 0; i < expectedCount; i++) { 
    //     await expect(apiLoggedInApp.homePage.productCard.nth(i)).toBeVisible(); 
    // }
});



