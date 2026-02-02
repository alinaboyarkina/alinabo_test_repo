import {config as dotenvConfig} from 'dotenv';
import { join } from 'path';

dotenvConfig ({ path: join (process.cwd (), '.env') });

export const BASE_URL: string = process.env.BASE_URL ?? 'https://practicesoftwaretesting.com';
export const API_BASE_URL: string = process.env.API_BASE_URL ?? 'https://api.practicesoftwaretesting.com';
export const USER_EMAIL: string = process.env.USER_EMAIL ?? 'customer@practicesoftwaretesting.com';
export const USER_PASSWORD: string = process.env.USER_PASSWORD!;
export const USER_FULL_NAME: string = process.env.USER_FULL_NAME ?? 'Jane Doe';