import { Locator, Page } from "@playwright/test";
import { HeaderFragmentInside } from '../fragments/header-inside';

export class MyAccount {

    page: Page;
    header: HeaderFragmentInside;
    favoriteButton: Locator;
    profileButton: Locator;
    invoicesButton: Locator;
    messagesButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.header = new HeaderFragmentInside(page);
        this.favoriteButton = this.page.locator('[data-test="nav-favorites"]');
        this.profileButton = this.page.locator('[data-test="nav-profile"]');
        this.invoicesButton = this.page.locator('[data-test="nav-invoices"]');
        this.messagesButton = this.page.locator('[data-test="nav-messages"]');
    }
}