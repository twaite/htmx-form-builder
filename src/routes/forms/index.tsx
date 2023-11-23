/// <reference types="@kitajs/html/hotwire-turbo.d.ts" />

import { z } from "zod";
import { clsx } from "clsx";

import type { ElysiaApp } from "app";
import { formRepo } from "repo";

const FormSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
});

type Form = z.infer<typeof FormSchema>;

type FormListProps = {
  name?: string;
  description?: string;
  nameError?: string;
  descriptionError?: string;
};

async function FormList(props: FormListProps) {
  const forms = await formRepo.findMany();

  return (
    <form hx-post="/forms">
      <h1 class="text-3xl font-bold">Select a form to begin:</h1>
      <div class="flex gap-3 py-3">
        {forms.map((form) => (
          <div class="flex flex-col bg-slate-500 shadow-lg p-3 rounded w-1/4 items-center justify-center h-20 cursor-pointer hover:shadow-lg hover:bg-slate:400">
            <h2 class="text-lg font-bold">{form.name}</h2>
            <p>{form.description}</p>
          </div>
        ))}
      </div>
      <div class="flex flex-col max-w-md gap-2">
        {/* TODO: input component */}
        <label for="name">Form Name</label>
        <input
          type="text"
          name="name"
          autofocus={props.nameError}
          class={clsx(
            "text-black border-2 focus:border-emerald-500 p-2 rounded outline-none",
            {
              "border-red-400 focus:border-red-600": props.nameError,
            }
          )}
          required
          value={props.name}
        />
        <p class="text-red-400">{props.nameError}</p>
        <textarea
          name="description"
          autofocus={props.descriptionError}
          class={clsx(
            "text-black border-2 focus:border-emerald-500 p-2 rounded outline-none",
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
        <button class="rounded bg-emerald-500 py-2">Add Form</button>
      </div>
    </form>
  );
}

export default (app: ElysiaApp) =>
  app
    .get("/", () => <FormList />)
    .post("/", async ({ body }) => {
      const parsed = FormSchema.safeParse(body);

      if (parsed.success) {
        await formRepo.create(parsed.data);

        return <FormList />;
      }

      console.error("Something went wrong parsing the form data.");

      const data = body as unknown as Partial<Form>;
      const errors = parsed.error.flatten().fieldErrors;

      return (
        <FormList
          name={data.name}
          description={data.description}
          nameError={errors.name?.[0]}
          descriptionError={errors.description?.[0]}
        />
      );
    });
