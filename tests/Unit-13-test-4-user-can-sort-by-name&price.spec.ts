import { expect } from '@playwright/test';
import { Product } from "../fragments/productCard";
import { test } from '../fixtures';

test.describe('Verify user can perform sorting by name & price (asc & desc) with allPages and fixture', () => {
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

  test.beforeAll(async ({ app, page }) => {
 
    await app.homePage.page.goto('/');
    allProducts = await app.homePage.getAllProducts();

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
  });
  
  for (const { sortValue, expectedKey } of sortingCases) {
    test( `Verify sorting by ${sortValue}`, async ({ app, page }) => {
      await page.goto('/');
      
      await app.homePage.selectSort(sortValue);

      const uiProductsRaw = await app.homePage.getFirstPageProducts(); 
      const uiProducts = uiProductsRaw.slice(0, 9);

      expect(uiProducts).toEqual(expectedProducts[expectedKey]);
    });
  }
});



