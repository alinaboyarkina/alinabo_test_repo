import { Locator, Page } from "@playwright/test";
import { HeaderFragmentInside } from '../fragments/header-inside';

export class HomePage {

    page: Page;
    header: HeaderFragmentInside;
    sortFilter: Locator;
    searchField: Locator;
    searchSubmitButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.header = new HeaderFragmentInside(page);
        this.sortFilter = this.page.locator('[data-test="sort"]');
        this.searchField = this.page.locator('[data-test="search-query"]');
        this.searchSubmitButton = this.page.locator('[data-test="search-submit"]');
    }

    async searchProduct(productName: string) {
        await this.searchField.fill(productName);
        await this.searchSubmitButton.click();
}

}