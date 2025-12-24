import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page-out';
import { HomePage } from '../pages/home.page-in';
import { ProductPage } from '../pages/product.page-in';

test ('VVerify user can view product details', async ({page}) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');
     
    const loginPage = new LoginPage (page);
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    const productName = 'Combination Pliers';
    const productPrice = '14.15';

    await page.goto('https://practicesoftwaretesting.com/auth/login');
    await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');


    await homePage.header.homeButton.click();
    await homePage.searchProduct(productName);

    await page
        .locator('[data-test="search_completed"] [data-test^="product-"]')
        .filter({ hasText: productName })
        .first()
        .click();
    
    await expect(productPage.productNameField).toHaveText(productName);
    await expect(productPage.unitPriceField).toContainText(productPrice);
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.addToFavoritesButton).toBeVisible();
});