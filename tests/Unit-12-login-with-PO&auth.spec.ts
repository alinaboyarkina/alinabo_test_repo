import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/home.page';
import { UserData } from '../testData/testData';

test ('Validate login successful', async ({page}) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');
    
    const homePage = new HomePage (page);

    await homePage.open();
    await expect(homePage.header.navMenuButton).toHaveText(UserData.userFulllName);

});