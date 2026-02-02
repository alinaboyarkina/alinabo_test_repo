import { expect } from '@playwright/test'
import { test } from '../fixtures';
import { TEST_USER } from '../testData/testUser';
import { VALID_CREDIT_CARD } from "../testData/testCreditCards";


test ('Verify user can add product and can checkout with allPages and fixture', async ({apiLoggedInApp}) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');

    await apiLoggedInApp.homePage.open();
    
    //Додати перший товар зі домашньої сторінки в корзину (зберегти назву та ціну товару).
    const firstProduct = await apiLoggedInApp.homePage.getFirstProduct(); 
    await apiLoggedInApp.homePage.firstProductCard.click ()
    await apiLoggedInApp.productPage.addToCartButton.click();

    //Відкрити корзину та перевірити, що назва, ціна і сумарна ціна відповідають доданому товару.
    await apiLoggedInApp.productPage.header.cartButton.click();
    await expect(apiLoggedInApp.checkoutCartPage.productNameInCartField).toHaveText(firstProduct.name);
    await expect(apiLoggedInApp.checkoutCartPage.productPriceInCartField).toHaveText(`$${firstProduct.price}`);
    await expect(apiLoggedInApp.checkoutCartPage.cartTotalField).toHaveText(`$${firstProduct.price}`);
    
    //Натиснути Proceed to checkout
    await apiLoggedInApp.checkoutCartPage.proceedCheckoutButton.click();

    //Перевірити, що юзер вже залогінений і нічого додатково робити не потрібно
    await expect(apiLoggedInApp.checkoutSignInPage.header.navMenuButton).toHaveText(TEST_USER.fullName);
    await apiLoggedInApp.checkoutSignInPage.proceedCheckoutButton.click();

    //Ввести відсутні поля на сторінці Billing Address
    await apiLoggedInApp.checkoutBillingAddressPage.stateInBillingAddressFormField.fill('Anystate');
    await apiLoggedInApp.checkoutBillingAddressPage.postcodeInBillingAddressFormField.fill('1010');
    await apiLoggedInApp.checkoutBillingAddressPage.proceedCheckoutButton.click();

    //На наступній заповнити тестові данні
    await apiLoggedInApp.checkoutPaymentPage.paymentMethodSelector.selectOption('credit-card');
    await apiLoggedInApp.checkoutPaymentPage.payWithCreditCard(VALID_CREDIT_CARD);
    await apiLoggedInApp.checkoutPaymentPage.confirmButton.click();

    //Перевірити, що платіж був успішним.
    await expect(apiLoggedInApp.checkoutPaymentPage.paymentSuccessMessage).toBeVisible()

});
