import { Page } from "@playwright/test";
import { LoginPage } from "./login.page";
import { MyAccount } from "./my-account.page";
import { CheckoutCartPage } from "./checkout-1-cart.page";
import { CheckoutSignInPage } from "./checkout-2-sign-in.page";
import { CheckoutBillingAddressPage } from "./checkout-3-billing-address.page";
import { CheckoutPaymentPage } from "./checkout-4-payment.page";
import { HomePage } from "./home.page";
import { ProductPage } from "./product.page";

export class App {
    page: Page;
    loginPage: LoginPage;
    myAccountPage: MyAccount;
    checkoutCartPage: CheckoutCartPage;
    checkoutSignInPage: CheckoutSignInPage;
    checkoutBillingAddressPage: CheckoutBillingAddressPage;
    checkoutPaymentPage: CheckoutPaymentPage;
    homePage: HomePage;
    productPage: ProductPage;
    
    constructor (page: Page) {
        this.page = page;
        this.loginPage = new LoginPage (page);
        this.myAccountPage = new MyAccount (page);
        this.checkoutCartPage = new CheckoutCartPage (page);
        this.checkoutSignInPage = new CheckoutSignInPage (page);
        this.checkoutBillingAddressPage = new CheckoutBillingAddressPage (page);
        this.checkoutPaymentPage = new CheckoutPaymentPage (page);
        this.homePage = new HomePage(page);
        this.productPage = new ProductPage (page);
    }
}