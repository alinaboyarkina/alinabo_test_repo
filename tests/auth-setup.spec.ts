import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page';

import path from 'path';
const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test ('Validate login successful', async ({page}) => {
    test.skip(process.env.CI === 'true', 'Skipped in CI');
    
    const loginPage = new LoginPage (page);

    await page.goto('/auth/login');
    await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');
    //await loginPage.performLogin('ualesya2022@gmail.com', 'uO6$fmG3+q');
    await expect(page).toHaveURL('/account');
    await page.close();
    await page.context().storageState({ path: authFile });
    }
);