import { Locator, Page } from "@playwright/test";
import { HeaderFragmentInside } from '../fragments/header-inside';

export class ProductPage {

    page: Page;
    header: HeaderFragmentInside;
    productNameField: Locator;
    unitPriceField: Locator;
    addToCartButton: Locator;
    addToFavoritesButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.header = new HeaderFragmentInside(page);
        this.productNameField = this.page.locator('[data-test="product-name"]');
        this.unitPriceField = this.page.locator('[data-test="unit-price"]');
        this.addToCartButton = this.page.locator('[data-test="add-to-cart"]');
        this.addToFavoritesButton = this.page.locator('[data-test="add-to-favorites"]');
    }
}