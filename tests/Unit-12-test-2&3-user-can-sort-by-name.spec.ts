import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { Product } from '../types/productCard';
import { buildSortedProductSets } from "../utils/sortProducts";

test.describe('Verify user can perform sorting by name (asc & desc)', () => {
  test.skip(process.env.CI === 'true', 'Skipped in CI');
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

  test.beforeEach(async ({ browser }) => {
    const page = await browser.newPage();
    const homePage = new HomePage(page);

    await homePage.open();
    allProducts = await homePage.getAllProducts();
    
    expectedProducts = buildSortedProductSets(allProducts);
    
    await page.close();
  });
  
  for (const { sortValue, expectedKey } of sortingCases) {
    test( `Verify sorting by ${sortValue}`, async ({ page }) => {
      const homePage = new HomePage(page);
      await page.goto('/');
      
      await homePage.selectSort(sortValue);

      const uiProductsRaw = await homePage.getFirstPageProducts(); 
      const uiProducts = expectedProducts[expectedKey].slice(0, uiProductsRaw.length);

      expect(uiProductsRaw).toEqual(uiProducts);
    });
  }
});



