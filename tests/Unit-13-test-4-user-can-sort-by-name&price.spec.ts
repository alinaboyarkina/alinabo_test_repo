import { expect } from '@playwright/test';
import { Product } from "../types/productCard";
import { test } from '../fixtures';
import { buildSortedProductSets } from "../utils/sortProducts";

test.describe('Verify user can perform sorting by name & price (asc & desc) with allPages and fixture', () => {
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

  test.beforeAll(async ({ app }) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');
 
    await app.homePage.open();
    allProducts = await app.homePage.getAllProducts();
    
    expectedProducts = buildSortedProductSets(allProducts);

  });
  
  for (const { sortValue, expectedKey } of sortingCases) {
    test( `Verify sorting by ${sortValue}`, async ({ app }) => {
      test.skip(process.env.CI === 'true', 'Skipped in CI');
      
      await app.homePage.open();
      
      await app.homePage.selectSort(sortValue);

      const uiProductsRaw = await app.homePage.getFirstPageProducts(); 
      const uiProducts = expectedProducts[expectedKey].slice(0, uiProductsRaw.length);

      expect(uiProductsRaw).toEqual(uiProducts);
    });
  }
});



