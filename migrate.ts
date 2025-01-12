import { migrate } from "drizzle-orm/postgres-js/migrator"
import {connection, db} from '@/lib/db/db'





(async()=>{
    await migrate(db,{migrationsFolder: './drzzle'});
    await connection.end();
})();