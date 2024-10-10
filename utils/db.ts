import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL ?? (() => { throw new Error("Database URL is undefined"); })());
export const db = drizzle(sql, { schema });