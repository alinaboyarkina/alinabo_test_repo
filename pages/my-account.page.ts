import { Locator, Page, expect } from "@playwright/test";
import { HeaderFragment } from '../fragments/header';

export class MyAccount {

    page: Page;
    header: HeaderFragment;
    favoriteButton: Locator;
    profileButton: Locator;
    invoicesButton: Locator;
    messagesButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.favoriteButton = this.page.getByTestId('nav-favorites');
        this.profileButton = this.page.getByTestId('nav-profile');
        this.invoicesButton = this.page.getByTestId('nav-invoices');
        this.messagesButton = this.page.getByTestId('nav-messages');
    }

    async open() { 
        await this.page.goto('/account'); 
    }

    async expectLoaded() { 
        await expect(this.page).toHaveURL('/account'); 
    }
}