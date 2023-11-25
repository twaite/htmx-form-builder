import { relations } from 'drizzle-orm';
import {
  pgTable,
  uuid,
  varchar,
  pgEnum,
  timestamp,
  integer,
  unique,
} from 'drizzle-orm/pg-core';

export const inputType = pgEnum('input_type', ['text', 'number', 'email']);

const timestampsAndID = {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
};

export const inputs = pgTable('inputs', {
  ...timestampsAndID,
  label: varchar('label').notNull(),
  placeholder: varchar('placeholder').notNull(),
  type: inputType('type').notNull().default('text'),
  stepId: uuid('step_id')
    .notNull()
    .references(() => steps.id),
});

export const inputsRelations = relations(inputs, ({ one }) => ({
  step: one(steps, {
    fields: [inputs.stepId],
    references: [steps.id],
  }),
}));

export const forms = pgTable('forms', {
  ...timestampsAndID,
  name: varchar('name').notNull(),
  description: varchar('description').notNull().default('N/A'),
});

export const formsRelations = relations(forms, ({ many }) => ({
  steps: many(steps),
}));

export const steps = pgTable(
  'step',
  {
    ...timestampsAndID,
    name: varchar('name'),
    number: integer('step').notNull().default(1),
    formId: uuid('form_id')
      .notNull()
      .references(() => forms.id),
  },
  (t) => ({
    formStepUnique: unique().on(t.formId, t.number),
  }),
);

export const stepsRelations = relations(steps, ({ one, many }) => ({
  form: one(forms, {
    fields: [steps.formId],
    references: [forms.id],
  }),
  inputs: many(inputs),
}));
