import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { exit } from "process";

if (!process.env.DB_URL) {
  throw new Error("Missing env var: DB_URL");
}

const sql = postgres(process.env.DB_URL, { max: 1 });
const db = drizzle(sql);

console.info("Running migrations...");

await migrate(db, { migrationsFolder: "./src/db/migrations" });

console.info("Migrations complete");

exit(0);
