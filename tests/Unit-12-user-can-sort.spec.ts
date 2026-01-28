import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { Product } from '../fragments/productCard';

let allProducts: Product[] = [];
  let expectedProducts: {
    byNameAsc: Product[];
    byNameDesc: Product[];
    byPriceAsc: Product[];
    byPriceDesc: Product[];
  };

  // test('Verify page products', async ({ page }) => {
//   const homePage = new HomePage(page);
//   await page.goto('/');
  
//   const products = await homePage.getAllProducts();
  
//   expect(products.length).toBeGreaterThan(0);
//   console.table(products); // Виведе гарну таблицю в консоль
// });

test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage();
  const homePage = new HomePage(page);

   // 1) переходимо на першу сторінку 
  await page.goto('/');
  allProducts = await homePage.getAllProducts();

    // готуємо еталонні масиви ОДИН раз
    expectedProducts = {
      byNameAsc: [...allProducts]
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 9),

      byNameDesc: [...allProducts]
        .sort((a, b) => b.name.localeCompare(a.name))
        .slice(0, 9),
    
      byPriceAsc: [...allProducts]
      .sort((a, b) => a.price - b.price)
        .slice(0, 9),

      byPriceDesc: [...allProducts]
        .sort((a, b) => b.price - a.price)
        .slice(0, 9),
};

  await page.close();

  console.log('TOTAL PRODUCTS:', allProducts.length);
  console.log([allProducts]);
  console.log('TOTAL PRODUCTS:', allProducts.length);
  console.log('EXPECTED NAME ASC:', expectedProducts.byNameAsc);
  console.log('EXPECTED NAME DESC:', expectedProducts.byNameDesc);
});

test.describe('Verify user can perform sorting by name (asc & desc)', () => {

    test('Name ASC sorting works', async ({ page }) => {
      const homePage = new HomePage(page);

      await page.goto('/');

      await homePage.selectSort('name,asc');
      await Promise.all([
        page.waitForResponse(resp =>
        resp.url().includes('/products') && resp.status() === 200
      ),
    ]);

    await page.waitForLoadState('load', { timeout: 10000 });

      // 5️⃣ збираємо дані ПІСЛЯ сортування
      const names = await homePage.productNameField.allTextContents();
      const prices = await homePage.productPriceField.allTextContents();

      const uiProducts = names.map((name, i) => ({
        name: name.trim(),
        price: Number(prices[i].replace('$', '').trim()),
      }));

      console.log('UI NAME ASC:', uiProducts);

      // 6️⃣ перевірка
      expect(uiProducts).toEqual(expectedProducts.byNameAsc);

    });
    
    test('Name DESC sorting works', async ({ page }) => {
      const homePage = new HomePage(page);

      await page.goto('/');

      await homePage.selectSort('name,desc');
      
      await Promise.all([
        page.waitForResponse(resp =>
        resp.url().includes('/products') && resp.status() === 200
      ),
    ]);

    await page.waitForLoadState('load', {timeout: 1000})

      const names = await homePage.productNameField.allTextContents();
      const prices = await homePage.productPriceField.allTextContents();

      const uiProducts = names.map((name, i) => ({
        name: name.trim(),
        price: Number(prices[i].replace('$', '').trim()),
      }));

      console.log('UI NAME DESC:', uiProducts);

      expect(uiProducts).toEqual(expectedProducts.byNameDesc);
    });

  test('Price ASC sorting works', async ({ page }) => {
      const homePage = new HomePage(page);

      await page.goto('/');

      await homePage.selectSort('price,asc');
      await Promise.all([
        page.waitForResponse(resp =>
        resp.url().includes('/products') && resp.status() === 200
      ),
    ]);

    await page.waitForLoadState('load', { timeout: 100 });

      // 5️⃣ збираємо дані ПІСЛЯ сортування
      const names = await homePage.productNameField.allTextContents();
      const prices = await homePage.productPriceField.allTextContents();

      const uiProducts = names.map((name, i) => ({
        name: name.trim(),
        price: Number(prices[i].replace('$', '').trim()),
      }));

      console.log('UI PRICE ASC:', uiProducts);

      // 6️⃣ перевірка
      expect(uiProducts).toEqual(expectedProducts.byPriceAsc);

    });
    
    test('Price DESC sorting works', async ({ page }) => {
      const homePage = new HomePage(page);

      await page.goto('/');

      await homePage.selectSort('price,desc');
      
      await Promise.all([
        page.waitForResponse(resp =>
        resp.url().includes('/products') && resp.status() === 200
      ),
    ]);

    await page.waitForLoadState('load', {timeout: 100})
      

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



