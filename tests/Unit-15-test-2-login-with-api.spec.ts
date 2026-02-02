import { expect } from '@playwright/test'
import { test } from '../fixtures';
import { UserData } from '../testData/testData';

test ('Validate login successful with API', { tag: '@regression' }, async ({apiLoggedInApp}) => {
    
    await apiLoggedInApp.homePage.open()
    await expect(apiLoggedInApp.homePage.header.navMenuButton).toHaveText(UserData.userFulllName);

});

