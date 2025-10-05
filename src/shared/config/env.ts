import { config } from 'dotenv';
import { z } from 'zod';

if (process.env.NODE_ENV === 'test') {
    config({ path: '.env.test' });
} else {
    config();
}

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.string(),
    DATABASE_URL_TEST: z.string(),
    RABBIT_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
    console.error('❌ Invalid environment v ariables', _env.error.format());
    throw new Error('Invalid environment variables.');
}

export const env = _env.data;