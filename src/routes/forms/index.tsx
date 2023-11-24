/// <reference types="@kitajs/html/hotwire-turbo.d.ts" />

import type { ElysiaApp } from "app";
import { FormRepository } from "repo";

async function FormList() {
  const forms = await FormRepository.getAll();

  return (
    <Html.Fragment>
      <h1 class="text-xl font-bold pb-3">Select a form to begin:</h1>
      <div class="grid lg:grid-cols-3 gap-3 mb-5">
        {forms.map((form) => (
          <a
            class="flex flex-col bg-gray-50 dark:bg-slate-500 shadow-lg p-3 rounded w-full items-center justify-center h-20 cursor-pointer hover:shadow-lg dark:hover:bg-slate-400 hover:bg-blue-100"
            href={`/form/${form.id}`}
          >
            <h2 class="text-lg font-bold">{form.name}</h2>
            <p>{form.description}</p>
          </a>
        ))}
        <div class="w-full flex items-center justify-center">
          <button
            class="rounded-full w-16 shadow-lg p-4 flex items-center justify-center bg-indigo-500 hover:shadow-xl hover:bg-indigo-600 cursor-pointer dark:bg-emerald-500"
            hx-get="/form/create"
            hx-target="#modal-container"
            hx-swap="innerHTML"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="2rem"
              viewBox="0 0 448 512"
              class="fill-white dark:fill-slate-700"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
          </button>
        </div>
      </div>
      <div id="modal-container" />
    </Html.Fragment>
  );
}

export default (app: ElysiaApp) => app.get("/", () => <FormList />);
