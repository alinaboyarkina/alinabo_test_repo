import { request } from '@playwright/test';
import { UserData } from '../testData/testData';

export async function getAuthStorageState() {
    const requestContext = await request.newContext();

    const response = await requestContext.post( 
        'https://practicesoftwaretesting.com/api/login', { 
            data: { 
                email: UserData.email, 
                password: UserData.password, 
            }, 
        } 
    );
    
    if (!response.ok()) { 
        throw new Error(`Login via API failed with status ${response.status()}`); 
    } 
    
    const storageState = await requestContext.storageState(); 
    await requestContext.dispose(); 
    return storageState;
}