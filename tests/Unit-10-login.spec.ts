import { test, expect } from '@playwright/test'

test ('Validate login successful', async ({page}) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');

    await page.goto('https://practicesoftwaretesting.com/auth/login');
    await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
    await page.locator('[data-test="password"]').fill('welcome01');
    await page.locator('[data-test="login-submit"]').click();
    
    await expect (page).toHaveURL('https://practicesoftwaretesting.com/account');
    
    await expect(page).toHaveTitle('Overview - Practice Software Testing - Toolshop - v5.0');
    
    await expect(page.locator('[data-test="nav-menu"]')).toHaveText('Jane Doe');

});