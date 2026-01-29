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
    byPriceAsc: Product[];
    byPriceDesc: Product[];
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
    {
      sortValue: 'price,asc',
      expectedKey: 'byPriceAsc' as const,
    },
    {
      sortValue: 'price,desc',
      expectedKey: 'byPriceDesc' as const,
    },
  ];

  test.beforeAll(async ({ browser }) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');

    const page = await browser.newPage();
    const homePage = new HomePage(page);

    await homePage.open();
    allProducts = await homePage.getAllProducts();

    expectedProducts = buildSortedProductSets(allProducts);

  });
  
  for (const { sortValue, expectedKey } of sortingCases) {
    test( `Verify sorting by ${sortValue}`, async ({ page }) => {
      test.skip(process.env.CI === 'true', 'Skipped in CI');
      
      const homePage = new HomePage(page);
      await homePage.open();
      
      await homePage.selectSort(sortValue);

      const uiProductsRaw = await homePage.getFirstPageProducts(); 
      const uiProducts = expectedProducts[expectedKey].slice(0, uiProductsRaw.length);

      expect(uiProductsRaw).toEqual(uiProducts);
    });
  }
});



