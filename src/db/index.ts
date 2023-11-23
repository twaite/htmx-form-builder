import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import * as schema from "./schema";
export * from "./schema";

if (!process.env.DB_URL) {
  throw new Error("Missing env var: DB_URL");
}

const sql = postgres(process.env.DB_URL, { max: 1 });
const db = drizzle(sql, { schema });

export default db;
