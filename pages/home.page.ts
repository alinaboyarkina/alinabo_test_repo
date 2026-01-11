import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from '../fragments/header';

export type Product = {
  name: string;
  price: number;
};
export class HomePage {
  page: Page;
  header: HeaderFragment;
  sortDropdown: Locator;
  searchField: Locator;
  searchSubmitButton: Locator;
  sortByCategoryCheckBox: Locator;
  productNameField: Locator;
  productPriceField: Locator;
  nextPageButton:Locator;
  nextPageItem: Locator;

  constructor (page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.sortDropdown = this.page.getByTestId('sort');
    this.searchField = this.page.getByTestId('search-query');
    this.searchSubmitButton = this.page.getByTestId('search-submit');
    this.sortByCategoryCheckBox = this.page.locator('.checkbox');
    this.productNameField = this.page.getByTestId('product-name');
    this.productPriceField = this.page.getByTestId('product-price');
    this.nextPageButton = this.page.getByRole('button', { name: 'Next' });
    this.nextPageItem = this.page.locator('li.page-item', { has: this.nextPageButton });
  }
  
  async searchProduct(productName: string) {
    await this.searchField.fill(productName);
    await this.searchSubmitButton.click();
  }
  
  productByName = (name: string) => this.page.getByTestId('search_completed').getByTestId(/^product-/).filter({ hasText: name }).first();

  categoryByName(name: string):Locator {
    return this.page
    .locator('label', { hasText: name })
    .locator('input[type="checkbox"]');
  }
  
  async getAllProducts(): Promise<Product[]> {
    const productMap = new Map<string, Product>();
      
    // чекаємо перший рендер
    await this.productNameField.first().waitFor({ state: 'visible' });

    let prevFirstProduct = '';

    while (true) {
      // чекаємо, що контент оновився
      const firstProduct = await this.productNameField.first().textContent();

      if (firstProduct === prevFirstProduct) {
        await this.page.waitForTimeout(100);
        continue;
      }

      prevFirstProduct = firstProduct ?? '';

      // збір поточної сторінки
      const names = await this.productNameField.allTextContents();
      const prices = await this.productPriceField.allTextContents();

      for (let i = 0; i < names.length; i++) {
        const product: Product = {
          name: names[i].trim(),
          price: Number(prices[i].replace('$', '').trim()),
        };

        const key = `${product.name}-${product.price}`;
        productMap.set(key, product); 
      }

      // перевірка останньої сторінки
      const isLastPage = await this.nextPageItem.evaluate(el =>
        el.classList.contains('disabled')
      );

      if (isLastPage) break;
      
      await this.nextPageButton.click();
    }
    return [...productMap.values()];
  };
  async selectSort(value: string) {
    await this.sortDropdown.selectOption(value);
    
    // чекаємо, що список реально оновився 
    await this.productNameField.first().waitFor({ state: 'visible' });
  }
};
 








