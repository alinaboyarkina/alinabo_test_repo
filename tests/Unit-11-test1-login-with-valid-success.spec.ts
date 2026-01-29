import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { TEST_USER } from '../testData/testUser';

test ('Validate login successful', async ({page}) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');
    
    const loginPage = new LoginPage (page);
    const homePage = new HomePage (page);

    await loginPage.open();
    await loginPage.performLogin(TEST_USER.email, TEST_USER.password);
    
    await expect(page).toHaveURL('/account');
    await expect(page).toHaveTitle('Overview - Practice Software Testing - Toolshop - v5.0');
    await expect(homePage.header.navMenuButton).toHaveText('Jane Doe');

});