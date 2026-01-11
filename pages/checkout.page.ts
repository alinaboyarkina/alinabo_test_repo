import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from '../fragments/header';

export class CheckoutPage {

    page: Page;
    header: HeaderFragment;
    productNameInCartField: Locator;
    productQuantityInCartField: Locator;
    continueShoppingButton: Locator;
    proceedCheckoutButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.productNameInCartField = this.page.getByTestId('product-title');
        this.productQuantityInCartField = this.page.getByTestId('product-quantity');
        this.continueShoppingButton = this.page.getByTestId('continue-shopping');
        this.proceedCheckoutButton = this.page.getByTestId('proceed-1');
        
    }
}