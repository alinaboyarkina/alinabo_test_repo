import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from '../fragments/header';

export class CheckoutPaymentPage {

    page: Page;
    header: HeaderFragment;
    productNameInCartField: Locator;
    paymentMethodSelector: Locator;
    creditCardNumberField: Locator;
    expirationDateField: Locator;
    cvvField: Locator;
    cardHolerNameField: Locator;
    confirmButton: Locator;
    paymentSuccessMessage: Locator;
    proceedCheckoutButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.productNameInCartField = this.page.getByTestId('product-title');
        this.paymentMethodSelector = this. page.getByTestId ('payment-method');
        this.creditCardNumberField = this. page.getByTestId ('credit_card_number');
        this.expirationDateField = this. page.getByTestId ('expiration_date');
        this.cvvField = this. page.getByTestId ('cvv');
        this.cardHolerNameField = this. page.getByTestId ('card_holder_name');
        this.confirmButton = this. page.getByTestId ('finish');
        this.paymentSuccessMessage = this. page.getByTestId ('payment-success-message');
        this.proceedCheckoutButton = this.page.getByTestId('proceed-4');
        
    }
}