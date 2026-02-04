import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page';
import { userData } from '../testData/testData';

import path from 'path';
const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test ('Validate login successful', async ({page}) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');
    
    const loginPage = new LoginPage (page);

    await loginPage.open();
    await loginPage.performLogin(userData.email, userData.password);
    await expect(page).toHaveURL('/account');
    await page.close();
    await page.context().storageState({ path: authFile });
    }
);