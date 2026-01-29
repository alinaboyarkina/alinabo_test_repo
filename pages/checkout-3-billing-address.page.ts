import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from '../fragments/header';

export class CheckoutBillingAddressPage {

    page: Page;
    header: HeaderFragment;
    billingAddressForm: Locator;
    streetInBillingAddressFormField: Locator;
    cityInBillingAddressFormField: Locator;
    stateInBillingAddressFormField: Locator;
    countryInBillingAddressFormField: Locator;
    postcodeInBillingAddressFormField: Locator;

   
    proceedCheckoutButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.billingAddressForm = this.page.getByTestId('StreetCityStateCountryPostal')
        this.streetInBillingAddressFormField = this.page.getByTestId('street');
        this.cityInBillingAddressFormField = this.page.getByTestId('city');
        this.stateInBillingAddressFormField = this.page.getByTestId('state');
        this.countryInBillingAddressFormField = this.page.getByTestId('country');
        this.postcodeInBillingAddressFormField = this.page.getByTestId('postal_code');
        this.proceedCheckoutButton = this.page.getByTestId('proceed-3');
        
    }
}