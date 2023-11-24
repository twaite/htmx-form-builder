import { relations } from "drizzle-orm";
import {
  pgTable,
  uuid,
  varchar,
  pgEnum,
  timestamp,
  integer,
  unique,
} from "drizzle-orm/pg-core";

export const inputType = pgEnum("input_type", ["text", "number", "email"]);

const timestampsAndID = {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
};

export const input = pgTable("inputs", {
  ...timestampsAndID,
  label: varchar("label").notNull(),
  placeholder: varchar("placeholder").notNull(),
  type: inputType("type").notNull().default("text"),
  formStepId: uuid("form_step_id")
    .notNull()
    .references(() => formStep.id),
});

export const inputRelations = relations(input, ({ one }) => ({
  formStep: one(formStep),
}));

export const form = pgTable("forms", {
  ...timestampsAndID,
  name: varchar("name").notNull(),
  description: varchar("description").notNull().default("N/A"),
});

export const formRelations = relations(form, ({ many }) => ({
  steps: many(formStep),
}));

export const formStep = pgTable(
  "form_steps",
  {
    ...timestampsAndID,
    step: integer("step").notNull().default(1),
    formId: uuid("form_id")
      .notNull()
      .references(() => form.id),
  },
  (t) => ({
    formStepUnique: unique().on(t.formId, t.step),
  })
);

export const formStepRelations = relations(formStep, ({ one, many }) => ({
  form: one(form),
  inputs: many(input),
}));
