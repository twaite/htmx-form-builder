import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const input = pgTable("inputs", {
  id: uuid("id").primaryKey(),
  label: varchar("label").notNull(),
  placeholder: varchar("placeholder").notNull(),
});

export const form = pgTable("forms", {
  id: uuid("id").primaryKey(),
  name: varchar("name").notNull(),
});
