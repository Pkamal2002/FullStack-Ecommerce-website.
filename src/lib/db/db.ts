import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';



const querryString = process.env.DATABASE_URL as string;
export const connection = postgres(querryString);
export  const db = drizzle( connection);


