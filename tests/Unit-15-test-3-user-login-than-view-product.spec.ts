import { expect } from '@playwright/test'
import { test } from '../fixtures';
import { UserData } from '../testData/testData';

test ('Verify user can view product details with allPages and fixture', { tag: '@regression' }, async ({app}) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');
    
    const productName = 'Combination Pliers';
    const productPrice = '14.15';

    await test.step('Open login page', async () => { 
        await app.loginPage.open(); 
    });
    
    await test.step('Log in with valid user credentials', async () => { 
        await app.loginPage.performLogin(UserData.email, UserData.password); 
    });

    await test.step('Navigate to Home page', async () => { 
        await app.homePage.header.homeButton.click(); 
    });

    await test.step(`Search for product: ${productName}`, async () => { 
        await app.homePage.searchProduct(productName); 
    });

    await test.step(`Open product details page`, async () => { 
        await app.homePage.productByName(productName).click(); 
    });

    await test.step('Verify product details are correct', async () => {
        await expect(app.productPage.productNameField).toHaveText(productName);
        await expect(app.productPage.unitPriceField).toContainText(productPrice);
        await expect(app.productPage.addToCartButton).toBeVisible();
        await expect(app.productPage.addToFavoritesButton).toBeVisible();
    });
});