import { expect } from '@playwright/test';
import { Product } from "../types/productCard";
import { test } from '../fixtures';
import { buildSortedProductSets } from "../utils/sortProducts";

test.describe('Verify user can perform sorting by name & price (asc & desc) with allPages and fixture', { tag: '@smoke' }, () => {
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

  test.beforeAll( 'Get all Products @smoke', async ({ app }) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');
    
    await test.step('Open home page', async () => {
      await app.homePage.open();
    });

    await test.step('Collect all products from UI', async () => {
      allProducts = await app.homePage.getAllProducts();
    });

    await test.step('Build expected sorted product sets', async () => {
      expectedProducts = buildSortedProductSets(allProducts);
    });
  });
    
    for (const { sortValue, expectedKey } of sortingCases) {
      test( `Verify sorting by ${sortValue}`, { tag: '@smoke' }, async ({ app }) => {
        test.skip(process.env.CI === 'true', 'Skipped in CI');
        
        await test.step('Open home page', async () => {
          await app.homePage.open();
        });

        await test.step(`Apply sorting: ${sortValue}`, async () => {
          await app.homePage.selectSort(sortValue);
        });
        
        const uiProductsRaw = await test.step('Collect products from UI after sorting', async () => { 
          return await app.homePage.getFirstPageProducts(); 
        }); 
          
        const uiProducts = expectedProducts[expectedKey].slice(0, uiProductsRaw.length);

        await test.step('Compare UI products with expected sorted products', async () => { 
          expect(uiProductsRaw).toEqual(uiProducts); 
        });
      });
    }
});



