import { expect } from '@playwright/test';
import { test } from '../fixtures';

test ('Verify user can add product to cart with allPages and fixture', async ({app, page}) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');
    
    const productName = 'Slip Joint Pliers';
    const productPrice = '9.17';
    const alert = page.getByRole('alert');

    await app.homePage.open();
    await app.homePage.header.homeButton.click();
    await app.homePage.searchProduct(productName);
    await app.homePage.productByName(productName).click();

    await expect(page).toHaveURL(/\/product\//);
    await expect(app.productPage.productNameField).toHaveText(productName);
    await expect(app.productPage.unitPriceField).toContainText(productPrice);
    await app.productPage.addToCartButton.click();
    await expect(alert).toBeVisible();
    await expect(alert).toHaveText('Product added to shopping cart.');
    await expect(alert).toBeHidden({ timeout: 8000 });
    await expect(app.productPage.header.productInCartQuantityIcon).toHaveText('1');
    await app.productPage.header.cartButton.click();
    await expect(page).toHaveURL('/checkout');
    await expect(app.checkoutCartPage.productQuantityInCartField).toHaveValue('1');
    await expect(app.checkoutCartPage.productNameInCartField).toHaveText(productName);
    await expect(app.checkoutCartPage.proceedCheckoutButton).toBeVisible();

});