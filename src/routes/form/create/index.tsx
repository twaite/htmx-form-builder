/// <reference types="@kitajs/html/hotwire-turbo.d.ts" />

import { t } from 'elysia';
import type { ElysiaApp } from 'app';
import { FormRepository, insertFormSchema } from 'repo';
import { first } from 'lodash-es';
import Input from 'components/Input';
import Button from 'components/Button';

type FormProps = {
  name?: string;
  nameError?: string;
  description?: string;
  descriptionError?: string;
};

function Form(props: FormProps) {
  return (
    <form
      class="fixed left-0 top-0 flex h-screen w-screen items-center justify-center px-5"
      hx-post="/form/create"
      hx-swap="outerHTML"
    >
      <div
        class="absolute h-full w-full bg-slate-900 opacity-60 backdrop-blur-md"
        hx-get="/forms"
        hx-target="main"
        hx-swap="innerHTML"
      />
      <div class="w-md z-10 mx-auto flex max-w-md flex-grow flex-col gap-1 rounded-lg bg-gray-50 p-5 shadow-lg dark:bg-slate-600">
        <Input
          label="Name"
          name="name"
          value={props.name}
          error={props.nameError}
          required
        />
        <Input
          label="Description"
          name="description"
          value={props.description}
          type="textarea"
          error={props.descriptionError}
          required
        />
        <Button class="mt-2">Add Form</Button>
      </div>
    </form>
  );
}

export default (app: ElysiaApp) =>
  app
    .get('/', () => <Form />)
    .post(
      '/',
      async ({ body }) => {
        const inputs = insertFormSchema.safeParse(body);

        if (!inputs.success) {
          const errors = inputs.error.flatten().fieldErrors;
          return (
            <Form
              {...body}
              nameError={first(errors.name)}
              descriptionError={first(errors.description)}
            />
          );
        }

        const form = await new FormRepository().create(inputs.data);

        return new Response(null, {
          headers: {
            'HX-Redirect': `/form/${form.id}`,
          },
        });
      },
      {
        body: t.Object({
          name: t.String(),
          description: t.String(),
        }),
      },
    );
