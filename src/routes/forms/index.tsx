/// <reference types="@kitajs/html/hotwire-turbo.d.ts" />

import type { ElysiaApp } from 'app';
import { Form } from 'app/entities';
import Icon from 'components/Icon';

type Props = {
  forms: Form[];
};

async function FormList({ forms }: Props) {
  return (
    <Html.Fragment>
      <h1 class="pb-3 text-xl font-bold">Select a form to begin:</h1>
      <div class="mb-5 grid gap-3 lg:grid-cols-3">
        {forms.map((form) => (
          <a
            class="flex h-20 w-full cursor-pointer flex-col items-center justify-center rounded bg-gray-50 p-3 shadow-md hover:bg-blue-100 hover:shadow-lg dark:bg-slate-500 dark:hover:bg-slate-400"
            href={`/form/${form.id}`}
          >
            <h2 class="text-lg font-bold">{form.name}</h2>
            <p>{form.description}</p>
          </a>
        ))}
        <div class="flex w-full items-center justify-center">
          <button
            class="flex w-16 cursor-pointer items-center justify-center rounded-full bg-indigo-500 p-4 shadow-lg hover:bg-indigo-600 hover:shadow-xl dark:bg-emerald-500"
            hx-get="/form/create"
            hx-target="#modal-container"
            hx-swap="innerHTML"
          >
            <Icon
              icon="Plus"
              height="2rem"
              class="fill-white dark:fill-slate-700"
            />
          </button>
        </div>
      </div>
      <div id="modal-container" />
    </Html.Fragment>
  );
}

export default (app: ElysiaApp) =>
  app.get('/', async ({ repos }) => {
    const forms = await repos.FormRepository.getAll();

    return <FormList forms={forms} />;
  });
