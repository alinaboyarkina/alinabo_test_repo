import { expect } from '@playwright/test'
import { test } from '../fixtures';
import { TEST_USER } from '../testData/testUser';


test ('Validate login successful with API', async ({apiLoggedInApp}) => {
    
    await apiLoggedInApp.homePage.open()
    await expect(apiLoggedInApp.homePage.header.navMenuButton).toHaveText(TEST_USER.fullName);

});

