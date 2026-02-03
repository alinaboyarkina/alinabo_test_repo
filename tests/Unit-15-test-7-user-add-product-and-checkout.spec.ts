import { expect } from '@playwright/test'
import { test } from '../fixtures';
import { UserData } from '../testData/testData';
import { VALID_CREDIT_CARD } from "../testData/testCreditCards";

test ('Verify user can add product and can checkout with allPages and fixture', { tag: '@regression' }, async ({apiLoggedInApp}) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');
    
    await test.step('Open home page as authenticated user', async () => {
        await apiLoggedInApp.homePage.open();
    });
        
    const firstProduct = await test.step('Get first product from home page', async () => { 
        return await apiLoggedInApp.homePage.getFirstProduct(); 
    });

    await test.step('Open first product details page', async () => {
        await apiLoggedInApp.homePage.firstProductCard.click ()
    });
    
    await test.step('Add product to cart', async () => {
        await apiLoggedInApp.productPage.addToCartButton.click();
    });
    
    await test.step('Open cart and verify product details', async () => {
        await apiLoggedInApp.productPage.header.cartButton.click();
        await expect(apiLoggedInApp.checkoutCartPage.productNameInCartField).toHaveText(firstProduct.name);
        await expect(apiLoggedInApp.checkoutCartPage.productPriceInCartField).toHaveText(`$${firstProduct.price}`);
        await expect(apiLoggedInApp.checkoutCartPage.cartTotalField).toHaveText(`$${firstProduct.price}`);
        });
    
    await test.step('Proceed to checkout', async () => {
        await apiLoggedInApp.checkoutCartPage.proceedCheckoutButton.click();
    });
    
    await test.step('Verify user is already logged in and continue checkout', async () => {
        await expect(apiLoggedInApp.checkoutSignInPage.header.navMenuButton).toHaveText(UserData.userFulllName);
        await apiLoggedInApp.checkoutSignInPage.proceedCheckoutButton.click();
    });
    
    await test.step('Fill missing Billing Address fields', async () => {
        await apiLoggedInApp.checkoutBillingAddressPage.stateInBillingAddressFormField.fill('Anystate');
        await apiLoggedInApp.checkoutBillingAddressPage.postcodeInBillingAddressFormField.fill('1010');
        await apiLoggedInApp.checkoutBillingAddressPage.proceedCheckoutButton.click();
    });
    
    await test.step('Fill payment details and confirm payment', async () => {
        await apiLoggedInApp.checkoutPaymentPage.paymentMethodSelector.selectOption('credit-card');
        await apiLoggedInApp.checkoutPaymentPage.payWithCreditCard(VALID_CREDIT_CARD);
        await apiLoggedInApp.checkoutPaymentPage.confirmButton.click();
        });

    await test.step('Verify payment success message is visible', async () => {
        await expect(apiLoggedInApp.checkoutPaymentPage.paymentSuccessMessage).toBeVisible()
    });
});
