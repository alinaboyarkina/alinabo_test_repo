import { test as base} from '@playwright/test';
import { App} from './pages/app';
//import { TEST_USER } from './testData/testUser';
//import { API_BASE_URL } from './testData/apiBaseUrl';
import { API_BASE_URL, USER_EMAIL, USER_PASSWORD } from './config/baseConfig';

// Declare the types of your fixtures.
type MyAppFixtures = {
  app: App;
  loggedInApp: App;
  apiLoggedInApp: App;
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

    // Залогінений app через API
    apiLoggedInApp: async ({ page, request }, use) => {
        
        const resp = await request.post(
            `${API_BASE_URL}/users/login`, 
            {
                data: {
                    email: USER_EMAIL, 
                    password: USER_PASSWORD,
                }
            }
        );
            
        let token: string;

        const jsonData = await resp.json();
        token = jsonData.access_token;
    
        await page.addInitScript ((token) => {
            window.localStorage.setItem ('auth-token', token);
        }, token)
        
        const app = new App(page);  
        await use(app); 
    },
});
