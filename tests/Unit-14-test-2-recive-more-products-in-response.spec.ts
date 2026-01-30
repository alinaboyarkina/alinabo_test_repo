import { expect } from '@playwright/test'
import { test } from '../fixtures';

test('`Verify 20 products are displayed per page', async ({ apiLoggedInApp }) => {

    const expectedCount = 20;
    
    await apiLoggedInApp.homePage.countProductsMock(expectedCount);
    await apiLoggedInApp.homePage.open();

    const products = apiLoggedInApp.homePage.productCard;

    await expect(apiLoggedInApp.homePage.productCard.first()).toContainText('Mock product');

    await expect(
        products,
        'Number of products displayed is incorrect',
    ).toHaveCount(expectedCount);
});



