import { test, expect} from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { Product } from '../fragments/productCard';

test.describe('Verify user can perform sorting by name (asc & desc)', () => {
  
  let allProducts: Product[] = [];
  let expectedProducts: {
    byNameAsc: Product[];
    byNameDesc: Product[];
  };
  
  test.beforeAll(async ({ browser }) => {
   const page = await browser.newPage();
   const homePage = new HomePage(page);
 
   await page.goto('/');
   allProducts = await homePage.getAllProducts();

    expectedProducts = {
        byNameAsc: [...allProducts]
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, 9),

        byNameDesc: [...allProducts]
        .sort((a, b) => b.name.localeCompare(a.name))
        .slice(0, 9),
    };
  
  });
  
  test.describe('Verify user can perform sorting by name (asc & desc)', () => {

    test('Name ASC sorting works', async ({ page }) => {
      const homePage = new HomePage(page);

      await page.goto('/');

      const firstNameBefore =
      await homePage.productNameField.first().textContent();

      await Promise.all([
        page.waitForResponse(resp =>
        resp.url().includes('/products') && resp.status() === 200
      ),
        homePage.selectSort('name,asc'),
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

      console.log('UI NAME ASC:', uiProducts);

      expect(uiProducts).toEqual(expectedProducts.byNameAsc);

    });
    
    test('Name DESC sorting works', async ({ page }) => {
      const homePage = new HomePage(page);

      await page.goto('/');
      
      const firstNameBefore =
      await homePage.productNameField.first().textContent();
      
      await Promise.all([
        page.waitForResponse(resp =>
        resp.url().includes('/products') && resp.status() === 200
      ),
      homePage.selectSort('name,desc'),
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

      expect(uiProducts).toEqual(expectedProducts.byNameDesc);
    });

  });
  
});

