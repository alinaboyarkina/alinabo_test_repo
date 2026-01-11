import { test, expect} from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { Product } from '../fragments/productCard';

test.describe('Verify user can perform sorting by price (asc & desc)', () => {
  
  let allProducts: Product[] = [];
  let expectedProducts: {
    byPriceAsc: Product[];
    byPriceDesc: Product[];
  };
  
  test.beforeAll(async ({ browser }) => {
    
   const page = await browser.newPage();
   const homePage = new HomePage(page);
 
   await page.goto('/');

   allProducts = await homePage.getAllProducts();
   
   expectedProducts = {
    byPriceAsc: [...allProducts]
      .sort((a, b) => a.price - b.price)
      .slice(0, 9),

    byPriceDesc: [...allProducts]
      .sort((a, b) => b.price - a.price)
      .slice(0, 9),
    };
  
  });
  
  test.describe('Verify user can perform sorting by price (asc & desc)', () => {

    test('Price ASC sorting works', async ({ page }) => {
      const homePage = new HomePage(page);

      await page.goto('/');
      
      const firstNameBefore =
      await homePage.productNameField.first().textContent();

      await Promise.all([
        page.waitForResponse(resp =>
        resp.url().includes('/products') && resp.status() === 200
      ),
       homePage.selectSort('price,asc'),
    ]);
    
    await expect.poll(async () =>
      homePage.productNameField.first().textContent()
  )
  .not.toBe(firstNameBefore);

      const names = await homePage.productNameField.allTextContents();
      const prices = await homePage.productPriceField.allTextContents();

      const uiProducts = names.map((name, i) => ({
        name: name.trim(),
        price: Number(prices[i].replace('$', '').trim()),
      }));

      expect(uiProducts).toEqual(expectedProducts.byPriceAsc);

    });
    
    test('Price DESC sorting works', async ({ page }) => {
      const homePage = new HomePage(page);

      await page.goto('/');
      
      const firstNameBefore =
      await homePage.productNameField.first().textContent();

      await Promise.all([
        page.waitForResponse(resp =>
        resp.url().includes('/products') && resp.status() === 200
      ),
      homePage.selectSort('price,desc'),
    ]);

    await page.waitForLoadState('load', {timeout: 100})
    
    await expect.poll(async () =>
      homePage.productNameField.first().textContent()
  )
  .not.toBe(firstNameBefore);
      
      const names = await homePage.productNameField.allTextContents();
      const prices = await homePage.productPriceField.allTextContents();

      const uiProducts = names.map((name, i) => ({
        name: name.trim(),
        price: Number(prices[i].replace('$', '').trim()),
      }));

      console.log('UI PRICE DESC:', uiProducts);

      expect(uiProducts).toEqual(expectedProducts.byPriceDesc);
    });

  });
  
});

