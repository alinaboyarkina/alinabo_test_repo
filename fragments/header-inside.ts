import { Locator, Page } from '@playwright/test';

export class HeaderFragmentInside {
  page: Page;
  homeButton: Locator;
  categoriesButton: Locator;
  contactButton: Locator;
  navMenuInButton: Locator;
  languageSelector: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeButton = this.page.locator('[data-test="nav-home"]');
    this.categoriesButton = this.page.locator('[data-test="nav-categories"]');
    this.contactButton = this.page.locator('[data-test="nav-contact"]');
    this.navMenuInButton = this.page.locator('[data-test="nav-menu"]');
    this.languageSelector = this.page.locator('[data-test="language-select"]');
  }
}

