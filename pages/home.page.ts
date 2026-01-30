import { Locator, Page, expect } from "@playwright/test";
import { HeaderFragment } from '../fragments/header';
import { Product } from "../types/productCard";

export class HomePage {
  page: Page;
  header: HeaderFragment;
  sortDropdown: Locator;
  searchField: Locator;
  searchSubmitButton: Locator;
  sortByCategoryCheckBox: Locator;
  productCard: Locator;
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
    this.productCard = this.page.locator('a.card');
    this.productNameField = this.page.getByTestId('product-name');
    this.productPriceField = this.page.getByTestId('product-price');
    this.nextPageButton = this.page.getByRole('button', { name: 'Next' });
    this.nextPageItem = this.page.locator('li.page-item', { has: this.nextPageButton });
  }
  
  async open() { 
        await this.page.goto('/'); 
    }

  async expectLoaded() { 
        await expect(this.page).toHaveURL('/');
  }
  
  get firstProductCard() {
    return this.page.getByTestId(/^product-/).first();
  }

  async getFirstProduct(): Promise<Product> {
    const card = this.firstProductCard;

    const name = (await card.getByTestId("product-name").textContent())?.trim() ?? '';
    const priceRaw = (await card.getByTestId("product-price").textContent())?.trim() ?? '';

    return {
      name,
      price: priceRaw ? Number(priceRaw.replace(/[^0-9.]/g, '')) : null
    };
  }

  async searchProduct(productName: string) {
    await this.searchField.fill(productName);
    await this.searchSubmitButton.click();
  }
  
  productByName (name: string) {
    return this.page.getByTestId('search_completed').getByTestId(/^product-/).filter({ hasText: name }).first()};

  categoryByName(name: string):Locator {
    return this.page
    .locator('label', { hasText: name })
    .locator('input[type="checkbox"]');
  }

  async getAllProducts(): Promise<Product[]> {
    const products: Product[] = [];
    let isLastPage: boolean;

    do {
      const allProductCards = this.page.locator("[data-test^='product-']");
      await allProductCards.first().waitFor({ state: 'visible' });

      const cards = await allProductCards.all();
      for (const card of cards) {
        const nameLocator = card.locator(this.productNameField);

        if (await nameLocator.count() > 0) {
          const name = (await nameLocator.textContent())?.trim() ?? '';
          const priceRaw = (await card.locator(this.productPriceField).textContent())?.trim() ?? '';

          products.push({
            name,
            price: priceRaw ? Number(priceRaw.replace(/[^0-9.]/g, '')) : null
          });
        }
      }

      isLastPage = await this.nextPageItem.evaluate(el => 
        el.classList.contains('disabled')
      );

      if (!isLastPage) {
        const firstProductNameBeforeClick = (await this.productNameField.first().textContent())?.trim();

        const responsePromise = this.page.waitForResponse(
          resp => resp.url().includes('/products') && resp.status() === 200,
          { timeout: 10000 }
        );

        await this.nextPageButton.click();
        await responsePromise;

        await this.page.waitForFunction(
          (oldName) => {
            const firstProduct = document.querySelector("[data-test='product-name']");
            return firstProduct && firstProduct.textContent?.trim() !== oldName;
          },
          firstProductNameBeforeClick,
          { timeout: 5000 }
        )
      }
    } while (!isLastPage); 
    return products;
  }

  async getFirstPageProducts(): Promise<Product[]> {
    const allProductCards = this.page.locator("[data-test^='product-']");
    await allProductCards.first().waitFor({ state: 'visible' });

    const cards = await allProductCards.all();
    const productData: Product[] = [];

    for (const card of cards) {
      const nameField = card.getByTestId("product-name");

      if (await nameField.count() > 0) {
        const name = (await nameField.textContent())?.trim() ?? '';
        const priceRaw = (await card.getByTestId("product-price").textContent())?.trim() ?? '';
        
        productData.push({
          name,
          price: priceRaw ? Number(priceRaw.replace(/[^0-9.]/g, '')) : null
        });
      }
    }
    return productData;
  }
  
  async selectSort(value: string) {
    const oldFirstName = (await this.productNameField.first().textContent())?.trim() ?? '';

    await Promise.all([
      this.page.waitForResponse(resp =>
        resp.url().includes('/products') && resp.status() === 200,
        { timeout: 10000 }
      ),
      this.sortDropdown.selectOption(value)
    ]);

    await expect.poll(async () => {
      return (await this.productNameField.first().textContent())?.trim();
    }, {
      timeout: 7000,
    }).not.toBe(oldFirstName);
 }

 async countProductsMock(productAmount: number): Promise<void> {
    await this.page.route(/\/products(\?.*)?$/, async (route) => {
      const products = Array.from({ length: productAmount }, (_, i) => ({
        id: `mock-id-${i + 1}`, 
        name: `Mock product ${i + 1}`, 
        description: `Mock description for product ${i + 1}`, 
        price: 1000 + i, 
        is_location_offer: false, 
        is_rental: false, 
        co2_rating: "A", 
        in_stock: true, 
        is_eco_friendly: false, 
        product_image: { 
          id: `mock-image-${i + 1}`, 
          by_name: "Mock Author", 
          by_url: "https://example.com", 
          source_name: "MockSource", 
          source_url: "https://example.com", 
          file_name: "mock-image.avif", 
          title: `Mock product ${i + 1}` 
        }, 
        category: { 
          id: `mock-category-${i + 1}`, 
          name: "Mock Category", 
          slug: "mock-category" 
        }, 
          brand: { 
            id: `mock-brand-${i + 1}`, 
            name: "Mock Brand" 
          }
      }));

      await route.fulfill({
        json: {
          current_page: 1,
          data: products,
          from: 1,
          last_page: 1,
          per_page: productAmount,
          to: productAmount,
          total: productAmount,
        },
      });
    });
  }
}
