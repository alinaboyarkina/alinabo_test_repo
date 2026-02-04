import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { userData } from '../testData/testData';

test ('Validate login successful', async ({page}) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');
    
    const loginPage = new LoginPage (page);
    const homePage = new HomePage (page);

    await loginPage.open();
    await loginPage.performLogin(userData.email, userData.password);
    
    
    await expect(page).toHaveURL('/account');
    await expect(page).toHaveTitle('Overview - Practice Software Testing - Toolshop - v5.0');
    await expect(homePage.header.navMenuButton).toHaveText(userData.userFulllName);

});