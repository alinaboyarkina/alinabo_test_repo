import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';
import { UserData } from '../testData/testData';

test ('VVerify user can view product details', async ({page}) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');
     
    const loginPage = new LoginPage (page);
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    const productName = 'Combination Pliers';
    const productPrice = '14.15';

    await loginPage.open();
    await loginPage.performLogin(UserData.email, UserData.password);

    await homePage.header.homeButton.click();
    await homePage.searchProduct(productName);
    await homePage.productByName(productName).click();

    await expect(productPage.productNameField).toHaveText(productName);
    await expect(productPage.unitPriceField).toContainText(productPrice);
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.addToFavoritesButton).toBeVisible();
});