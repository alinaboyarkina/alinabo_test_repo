import { expect } from '@playwright/test'
import { test } from '../fixtures';

test ('Validate login successful with allPages and fixture', async ({app, page}) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');
    
    await app.loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');
    
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
    await expect(page).toHaveTitle('Overview - Practice Software Testing - Toolshop - v5.0');
    await expect(page.locator('[data-test="nav-menu"]')).toHaveText('Jane Doe');

});