import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from '../fragments/header';

export class ProductPage {

    page: Page;
    header: HeaderFragment;
    productNameField: Locator;
    unitPriceField: Locator;
    addToCartButton: Locator;
    addToFavoritesButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.productNameField = this.page.getByTestId('product-name');
        this.unitPriceField = this.page.getByTestId('unit-price');
        this.addToCartButton = this.page.getByTestId('add-to-cart');
        this.addToFavoritesButton = this.page.getByTestId('add-to-favorites');
        
    }
}