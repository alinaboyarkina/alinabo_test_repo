import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';
import { CheckoutCartPage } from '../pages/checkout-1-cart.page';


test ('Verify user can add product to cart', async ({page}) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');
    
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const checkoutCartPage = new CheckoutCartPage(page);
    
    const productName = 'Slip Joint Pliers';
    const productPrice = '9.17';
    const alert = page.getByRole('alert');

    await homePage.open();
    await homePage.header.homeButton.click();
    await homePage.searchProduct(productName);
    await homePage.productByName(productName).click();

    await expect(page).toHaveURL(/\/product\//);
    await expect(productPage.productNameField).toHaveText(productName);
    await expect(productPage.unitPriceField).toContainText(productPrice);
    await productPage.addToCartButton.click();
    await expect(alert).toBeVisible();
    await expect(alert).toHaveText('Product added to shopping cart.');
    await expect(alert).toBeHidden({ timeout: 8000 });
    await expect(productPage.header.productInCartQuantityIcon).toHaveText('1');
    await productPage.header.cartButton.click();
    await expect(page).toHaveURL('/checkout');
    await expect(checkoutCartPage.productQuantityInCartField).toHaveValue('1');
    await expect(checkoutCartPage.productNameInCartField).toHaveText(productName);
    await expect(checkoutCartPage.proceedCheckoutButton).toBeVisible();

});