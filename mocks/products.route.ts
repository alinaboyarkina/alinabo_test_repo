import { Page } from '@playwright/test';
import { generateMockProducts } from './products.mock';

export async function mockProductsRoute(page: Page, amount: number) {
  await page.route('**/products**', async (route) => {
    const products = generateMockProducts(amount);

    await route.fulfill({
      json: {
        current_page: 1,
        data: products,
        from: 1,
        last_page: 1,
        per_page: amount,
        to: amount,
        total: amount,
      },
    });
  });
}
