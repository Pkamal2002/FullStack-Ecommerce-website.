import { migrate } from "drizzle-orm/postgres-js/migrator"
import {connection, db} from '@/lib/db/db'
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });




(async()=>{
    await migrate(db,{migrationsFolder: './drzzle'});
    await connection.end();
})();