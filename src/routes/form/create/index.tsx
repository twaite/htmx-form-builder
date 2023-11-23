/// <reference types="@kitajs/html/hotwire-turbo.d.ts" />

import { t } from "elysia";
import type { ElysiaApp } from "app";
import clsx from "clsx";
import { formRepo } from "repo";
import { first } from "lodash-es";

type FormProps = {
  name?: string;
  nameError?: string;
  description?: string;
  descriptionError?: string;
};

function Form(props: FormProps) {
  return (
    <form
      class="fixed w-screen h-screen flex top-0 items-center justify-center"
      hx-post="/form/create"
      hx-swap="outerHTML"
    >
      {/* TODO: close on backdrop click */}
      <a
        class="w-full h-full absolute opacity-60 bg-slate-900 backdrop-blur-md"
        href="/"
      />
      <div class="flex flex-col w-md mx-auto gap-1 z-10 bg-gray-50 dark:bg-slate-600 rounded-lg shadow-lg p-5 flex-grow max-w-md">
        {/* TODO: input component */}
        <label for="name">Name</label>
        <input
          type="text"
          name="name"
          autofocus={props.nameError}
          class={clsx(
            "text-black border-2 dark:focus:border-emerald-500 p-2 rounded outline-none dark:bg-slate-200",
            {
              "border-red-400 focus:border-red-600 dark:focus:border-red-600":
                props.nameError,
            }
          )}
          required
          value={props.name}
        />
        <p class="text-red-400">{props.nameError}</p>
        <label for="description">Description</label>
        <textarea
          name="description"
          autofocus={props.descriptionError}
          class={clsx(
            "text-black border-2 dark:focus:border-emerald-500 p-2 rounded outline-none dark:bg-slate-200",
            {
              "border-red-400 focus:border-red-600": props.descriptionError,
            }
          )}
          required
        >
          {props.description ?? "N/A"}
        </textarea>
        <p class="text-red-400">{props.descriptionError}</p>
        {/* TODO: button component */}
        <button class="rounded text-white dark:text-slate-800 bg-indigo-600 dark:bg-emerald-500 py-2 mt-2">
          Add Form
        </button>
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
