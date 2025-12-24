import { Locator, Page } from '@playwright/test';

export class HeaderFragmentOut {
  page: Page;
  homeButton: Locator;
  categoriesButton: Locator;
  contactButton: Locator;
  signInButton: Locator;
  languageSelector: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeButton = this.page.locator('[data-test="nav-home"]');
    this.categoriesButton = this.page.locator('[data-test="nav-categories"]');
    this.contactButton = this.page.locator('[data-test="nav-contact"]');
    this.signInButton = this.page.locator('[data-test="nav-sign-in"]');
    this.languageSelector = this.page.locator('[data-test="language-select"]');
  }
}

