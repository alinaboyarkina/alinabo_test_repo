import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { Product } from '../fragments/productCard';

test.describe('Verify user can perform sorting by name (asc & desc)', () => {
  let allProducts: Product[] = [];
  let expectedProducts: {
    byNameAsc: Product[];
    byNameDesc: Product[];
  };
  
  const sortingCases = [
    {
      sortValue: 'name,asc',
      expectedKey: 'byNameAsc' as const,
    },
    {
      sortValue: 'name,desc',
      expectedKey: 'byNameDesc' as const,
    },
  ];

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
    await page.close();
  });
  
  for (const { sortValue, expectedKey } of sortingCases) {
    test( `Verify sorting by ${sortValue}`, async ({ page }) => {
      const homePage = new HomePage(page);
      await page.goto('/');
      
      // 1. Сортуємо (метод сам дочекається і мережі, і оновлення тексту)
      await homePage.selectSort(sortValue);

      // 2. Тепер збираємо дані. Використовуйте версію з evaluate, 
      // щоб уникнути помилок з nth(1)
      const uiProductsRaw = await homePage.getFirstPageProducts(); 
      const uiProducts = uiProductsRaw.slice(0, 9);

      expect(uiProducts).toEqual(expectedProducts[expectedKey]);
    });
  }
});



