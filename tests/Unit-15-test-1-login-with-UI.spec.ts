import { expect } from '@playwright/test'
import { test } from '../fixtures';
import { UserData } from '../testData/testData';
import { PAGE_TITLES } from '../testData/testPagesTitles';

test ('Validate login successful with allPages and fixture', { tag: '@regression' }, async ({app, page}) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');
    
    await app.loginPage.open();
    await app.loginPage.performLogin(UserData.email, UserData.password);
    
    await expect(page).toHaveURL('/account');
    await expect(page).toHaveTitle(PAGE_TITLES.accountOverview);
    await expect(app.myAccountPage.header.navMenuButton).toHaveText(UserData.userFulllName);

});