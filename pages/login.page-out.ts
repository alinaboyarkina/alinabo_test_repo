import { Locator, Page } from "@playwright/test";
import { HeaderFragmentOut } from '../fragments/header-out';

export class LoginPage {

    page: Page;
    header: HeaderFragmentOut;
    emailField: Locator;
    passwordField: Locator;
    loginButton: Locator;
    constructor (page: Page) {
        this.page = page;
        this.header = new HeaderFragmentOut(page);
        this.emailField = this.page.locator('[data-test="email"]');
        this.passwordField = this.page.locator('[data-test="password"]');
        this.loginButton = this.page.locator('[data-test="login-submit"]');
    }
    
    async performLogin (email: string, password: string) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}