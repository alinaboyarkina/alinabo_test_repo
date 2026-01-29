import { test as base} from '@playwright/test';
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

    // Залогінений app через storageState
    loggedInApp: async ({ browser }, use) => {
        
        const context = await browser.newContext({ 
            storageState: './playwright/.auth/user.json' 
        });
        
        const page = await context.newPage(); 
        const app = new App(page);

        await page.goto('');
    
        await use(app);
        await context.close();
    },
});
