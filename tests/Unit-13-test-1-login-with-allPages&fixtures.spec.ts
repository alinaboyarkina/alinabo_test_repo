import { expect } from '@playwright/test'
import { test } from '../fixtures';
import { TEST_USER } from '../testData/testUser';
import { PAGE_TITLES } from '../testData/testPagesTitles';

test ('Validate login successful with allPages and fixture', async ({app, page}) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');
    
    await app.loginPage.open();
    await app.loginPage.performLogin(TEST_USER.email, TEST_USER.password);
    
    await expect(page).toHaveURL('/account');
    await expect(page).toHaveTitle(PAGE_TITLES.accountOverview);
    await expect(app.myAccountPage.header.navMenuButton).toHaveText(TEST_USER.fullName);

});