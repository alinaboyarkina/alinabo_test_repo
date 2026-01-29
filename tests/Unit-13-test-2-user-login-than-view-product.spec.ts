import { expect } from '@playwright/test'
import { test } from '../fixtures';
import { TEST_USER } from '../testData/testUser';

test ('Verify user can view product details with allPages and fixture', async ({app}) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');
    
    const productName = 'Combination Pliers';
    const productPrice = '14.15';

    await app.loginPage.open();
    await app.loginPage.performLogin(TEST_USER.email, TEST_USER.password);

    await app.homePage.header.homeButton.click();
    await app.homePage.searchProduct(productName);
    await app.homePage.productByName(productName).click();

    await expect(app.productPage.productNameField).toHaveText(productName);
    await expect(app.productPage.unitPriceField).toContainText(productPrice);
    await expect(app.productPage.addToCartButton).toBeVisible();
    await expect(app.productPage.addToFavoritesButton).toBeVisible();
});