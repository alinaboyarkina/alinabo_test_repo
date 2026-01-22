import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/home.page';

test ('Validate login successful', async ({page}) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');
    
    const homePage = new HomePage (page);

    await page.goto('');
    await expect(homePage.header.navMenuButton).toHaveText('Jane Doe');

});