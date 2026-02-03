import { expect } from '@playwright/test'
import { test } from '../fixtures';
import { UserData } from '../testData/testData';
import { PAGE_TITLES } from '../testData/testPagesTitles';

test ('Validate login successful with allPages and fixture', { tag: '@regression' }, async ({app, page}) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');
    
    await test.step('Open login page', async () => { 
        await app.loginPage.open(); 
    }); 
    
    await test.step('Perform login with valid credentials', async () => { 
        await app.loginPage.performLogin(UserData.email, UserData.password); 
    }); 
    
    await test.step('Verify user is redirected to account page', async () => { 
        await expect(page).toHaveURL('/account'); 
        await expect(page).toHaveTitle(PAGE_TITLES.accountOverview); 
    }); 
    
    await test.step('Verify user full name is displayed in header', async () => { 
        await expect(app.myAccountPage.header.navMenuButton) .toHaveText(UserData.userFulllName); 
    });

});