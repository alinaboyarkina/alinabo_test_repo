import { test, expect} from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { Product } from '../fragments/productCard';

test.describe('Verify user can perform sorting by price (asc & desc)', () => {
  
  let allProducts: Product[] = [];
  let expectedProducts: {
    byPriceAsc: Product[];
    byPriceDesc: Product[];
  };
  
  const sortingCases = [
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

