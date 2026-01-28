import { expect } from '@playwright/test'
import { test } from '../fixtures';

test ('Verify user can add product and can checkout with allPages and fixture', async ({loggedInApp,page}) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');

    await loggedInApp.homePage.open();
    
    //Додати перший товар зі домашньої сторінки в корзину (зберегти назву та ціну товару).
    const firstProduct = await loggedInApp.homePage.getFirstProduct(); 
    await loggedInApp.homePage.firstProductCard.click ()
    await loggedInApp.productPage.addToCartButton.click();

    //Відкрити корзину та перевірити, що назва, ціна і сумарна ціна відповідають доданому товару.
    await loggedInApp.productPage.header.cartButton.click();
    await expect(loggedInApp.checkoutCartPage.productNameInCartField).toHaveText(firstProduct.name);
    await expect(loggedInApp.checkoutCartPage.productPriceInCartField).toHaveText(`$${firstProduct.price}`);
    await expect(loggedInApp.checkoutCartPage.cartTotalField).toHaveText(`$${firstProduct.price}`);
    
    //Натиснути Proceed to checkout
    await loggedInApp.checkoutCartPage.proceedCheckoutButton.click();

    //Перевірити, що юзер вже залогінений і нічого додатково робити не потрібно
    await expect(loggedInApp.checkoutSignInPage.header.navMenuButton).toHaveText('Jane Doe');
    await loggedInApp.checkoutSignInPage.proceedCheckoutButton.click();
    //await expect(loggedInApp.checkoutBillingAddressPage.billingAddressForm).toBeVisible();

    //Ввести відсутні поля на сторінці Billing Address
    await loggedInApp.checkoutBillingAddressPage.stateInBillingAddressFormField.fill('Anystate');
    await loggedInApp.checkoutBillingAddressPage.postcodeInBillingAddressFormField.fill('1010');
    await loggedInApp.checkoutBillingAddressPage.proceedCheckoutButton.click();

    //На наступній сторінці обрати:
    // Credit Card -> Card number: 1111-1111-1111-1111
    // Expiration Date: +3 місяці до дати запуску тесту
    // CVV: 111
    // Card Holder Name: any name
    // Confirm
    await loggedInApp.checkoutPaymentPage.paymentMethodSelector.selectOption('credit-card');
    await loggedInApp.checkoutPaymentPage.creditCardNumberField.fill('1111-1111-1111-1111');
    await loggedInApp.checkoutPaymentPage.expirationDateField.fill('04/2026');
    await loggedInApp.checkoutPaymentPage.cvvField.fill('111');
    await loggedInApp.checkoutPaymentPage.cardHolerNameField.fill('any name');
    await loggedInApp.checkoutPaymentPage.confirmButton.click();

    //Перевірити, що платіж був успішним.
    await expect(loggedInApp.checkoutPaymentPage.paymentSuccessMessage).toBeVisible()

});
