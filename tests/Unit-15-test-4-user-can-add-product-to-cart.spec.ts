import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { TEST_ALERTS } from '../testData/testAlertsMessages';

test ('Verify user can add product to cart with allPages and fixture', { tag: '@regression' }, async ({app, page}) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');
    
    const productName = 'Slip Joint Pliers';
    const productPrice = '9.17';
    const alert = page.getByRole('alert');

    await test.step('Open home page', async () => {
        await app.homePage.open();
    });

    await test.step('Navigate to Home section', async () => {
        await app.homePage.header.homeButton.click();
    });
        
    await test.step(`Search for product`, async () => {
        await app.homePage.searchProduct(productName);
    });

    await test.step(`Open product details page for: ${productName}`, async () => {
        await app.homePage.productByName(productName).click();
    });

    await test.step('Verify product details are correct', async () => {
        await expect(page).toHaveURL(/\/product\//);
        await expect(app.productPage.productNameField).toHaveText(productName);
        await expect(app.productPage.unitPriceField).toContainText(productPrice);
    });

    await test.step('Add product to cart and verify alert', async () => {
        await app.productPage.addToCartButton.click();
        await expect(alert).toBeVisible();
        await expect(alert).toHaveText(TEST_ALERTS.productAddedToCart);
        await expect(alert).toBeHidden({ timeout: 8000 });
    });
        
    await test.step('Verify cart icon shows correct quantity', async () => {
        await expect(app.productPage.header.productInCartQuantityIcon).toHaveText('1');
    });
        
    await test.step('Open cart and verify product inside checkout page', async () => {
        await app.productPage.header.cartButton.click();
        await expect(page).toHaveURL('/checkout');
        await expect(app.checkoutCartPage.productQuantityInCartField).toHaveValue('1');
        await expect(app.checkoutCartPage.productNameInCartField).toHaveText(productName);
        await expect(app.checkoutCartPage.proceedCheckoutButton).toBeVisible();
    });
});