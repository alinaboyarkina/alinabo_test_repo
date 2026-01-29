import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from '../fragments/header';

export class CheckoutSignInPage {

    page: Page;
    header: HeaderFragment;
    proceedCheckoutButton: Locator;
 

    constructor (page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.proceedCheckoutButton = this.page.getByTestId('proceed-2');
        
    }
}