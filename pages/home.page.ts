import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from '../fragments/header';

export class HomePage {

    page: Page;
    header: HeaderFragment;
    sortFilter: Locator;
    searchField: Locator;
    searchSubmitButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.sortFilter = this.page.getByTestId('sort');
        this.searchField = this.page.getByTestId('search-query');
        this.searchSubmitButton = this.page.getByTestId('search-submit');
    }

    async searchProduct(productName: string) {
        await this.searchField.fill(productName);
        await this.searchSubmitButton.click();
}
    productByName = (name: string) => this.page.getByTestId('search_completed').getByTestId(/^product-/).filter({ hasText: name }).first();

}