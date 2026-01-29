import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page';
import { TEST_USER } from '../testData/testUser';

import path from 'path';
const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test ('Validate login successful', async ({page}) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');
    
    const loginPage = new LoginPage (page);

    await loginPage.performLogin(TEST_USER.email, TEST_USER.password);
    await expect(page).toHaveURL('/account');
    await page.close();
    await page.context().storageState({ path: authFile });
    }
);