import { expect } from '@playwright/test'
import { test } from '../fixtures';
import { userData } from '../testData/testData';

test ('Validate login successful with API', { tag: '@regression' }, async ({apiLoggedInApp}) => {
    
    await test.step('Open home page as an already authenticated user', async () => { 
        await apiLoggedInApp.homePage.open(); 
    });
    
    await test.step('Verify user full name is displayed in header', async () => { 
        await expect(apiLoggedInApp.homePage.header.navMenuButton) .toHaveText(userData.userFulllName); 
    });

});

