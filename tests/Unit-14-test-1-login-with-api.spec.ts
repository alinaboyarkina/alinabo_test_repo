import { expect } from '@playwright/test'
import { test } from '../fixtures';
import { userData } from '../testData/testData';

test ('Validate login successful with API', async ({apiLoggedInApp}) => {
    
    await apiLoggedInApp.homePage.open()
    await expect(apiLoggedInApp.homePage.header.navMenuButton).toHaveText(userData.userFulllName);

});

