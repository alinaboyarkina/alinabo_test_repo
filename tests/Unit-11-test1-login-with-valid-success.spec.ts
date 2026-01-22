import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';

test ('Validate login successful', async ({page}) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');
    
    const loginPage = new LoginPage (page);
    const homePage = new HomePage (page);

    await page.goto('/auth/login');
    await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');
    
    await expect(page).toHaveURL('/account');
    await expect(page).toHaveTitle('Overview - Practice Software Testing - Toolshop - v5.0');
    await expect(homePage.header.navMenuButton).toHaveText('Jane Doe');

});