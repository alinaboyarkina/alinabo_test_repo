import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/home.page';
import { TEST_USER } from '../testData/testUser';

test ('Validate login successful', async ({page}) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');
    
    const homePage = new HomePage (page);

    await homePage.open();
    await expect(homePage.header.navMenuButton).toHaveText(TEST_USER.fullName);

});