/// <reference types="@kitajs/html/hotwire-turbo.d.ts" />

import { t } from "elysia";
import type { ElysiaApp } from "app";
import { formRepo } from "repo";
import { first } from "lodash-es";
import Input from "components/Input";
import Button from "components/Button";

type FormProps = {
  name?: string;
  nameError?: string;
  description?: string;
  descriptionError?: string;
};

function Form(props: FormProps) {
  return (
    <form
      class="fixed w-screen h-screen flex top-0 left-0 items-center justify-center px-5"
      hx-post="/form/create"
      hx-swap="outerHTML"
    >
      <a
        class="w-full h-full absolute opacity-60 bg-slate-900 backdrop-blur-md"
        href="/"
      />
      <div class="flex flex-col w-md mx-auto gap-1 z-10 bg-gray-50 dark:bg-slate-600 rounded-lg shadow-lg p-5 flex-grow max-w-md">
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
        <Button>Add Form</Button>
      </div>
    </form>
  );
}

export default (app: ElysiaApp) =>
  app
    .get("/", () => <Form />)
    .post(
      "/",
      async ({ body }) => {
        const inputs = formRepo.insertSchema.safeParse(body);

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

        const form = await formRepo.create(inputs.data);

        return new Response(null, {
          headers: {
            "HX-Redirect": `/form/${form.id}`,
          },
        });
      },
      {
        body: t.Object({
          name: t.String(),
          description: t.String(),
        }),
      }
    );
