import { test as base, expect } from '@playwright/test';
import { App} from './pages/app';

// Declare the types of your fixtures.
type MyAppFixtures = {
  app: App;
  loggedInApp: App;
};

export const test = base.extend<MyAppFixtures>({
    
    app: async ({ page }, use) => {
        const app = new App (page);
        await use(app);
    },
  
    // loggedInApp: async ({ page }, use) => {
    //     const app = new App (page);
    
    //     // Set up the fixture.
    //     await app.loginPage.page.goto('https://practicesoftwaretesting.com/auth/login');
    //     await app.loginPage.emailField.fill('customer@practicesoftwaretesting.com');
    //     await app.loginPage.passwordField.fill('welcome01');
    //     await app.loginPage.loginButton.click();
    //     await expect(page).toHaveURL(/.*account/);

    //     // Use the fixture value in the test.
    //     await use(app);
    // },

    // Залогінений app через storageState
    loggedInApp: async ({ browser }, use) => {
        
        const context = await browser.newContext({ 
            storageState: './playwright/.auth/user.json' 
        });
        
        const page = await context.newPage(); 
        const app = new App(page);

        await page.goto('https://practicesoftwaretesting.com/');
    
        //await expect(page).toHaveURL(/.*account/);
        await use(app);
        await context.close();
    },
});
