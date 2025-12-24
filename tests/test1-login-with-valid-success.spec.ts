import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page-out';

test ('Validate login successful', async ({page}) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');
    
    const loginPage = new LoginPage (page);

    await page.goto('https://practicesoftwaretesting.com/auth/login');
    await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');
    
    await expect (page).toHaveURL('https://practicesoftwaretesting.com/account');
    await expect(page).toHaveTitle('Overview - Practice Software Testing - Toolshop - v5.0');
    await expect(page.locator('[data-test="nav-menu"]')).toHaveText('Jane Doe');

});