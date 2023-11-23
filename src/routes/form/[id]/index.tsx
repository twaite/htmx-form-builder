/// <reference types="@kitajs/html/hotwire-turbo.d.ts" />

import type { ElysiaApp } from "app";
import { NotFoundError } from "app/errors";
import Button from "components/Button";
import FormPreview from "components/FormPreview";
import Layout from "components/Layout";
import { t } from "elysia";
import { formRepo } from "repo";

export default (app: ElysiaApp) =>
  app
    .get("/", async ({ params: { id }, set }) => {
      try {
        const form = await formRepo.findByIdThrows(id);

        return (
          <Layout>
            <div class="grid grid-cols-3 gap-4">
              <form id="view-form" class="flex flex-col gap-3 col-span-2">
                <div class="flex items-center">
                  <h1 class="text-3xl flex-grow">{form.name}</h1>
                  <Button
                    hx-get={`/form/${id}/edit`}
                    hx-target="closest #view-form"
                    hx-swap="innerHTML"
                    variant="secondary"
                  >
                    Edit Details
                  </Button>
                </div>
                <h3 class="text-lg">{form.description}</h3>
              </form>
              <div class="rounded-lg bg-white p-4 dark:bg-slate-500">
                <FormPreview form={form} />
              </div>
            </div>
          </Layout>
        );
      } catch (e) {
        if (e instanceof NotFoundError) {
          set.status = 404;
          return "404 Not Found"; // TODO: error component
        }

        set.status = 500;
        return "Internal Server Error"; // TODO: pretty error page
      }
    })
    .post(
      "/",
      async ({ params: { id }, body, set }) => {
        await formRepo.update(id, body);

        set.headers = {
          "HX-Redirect": `/form/${id}/`,
        };
      },
      {
        body: t.Object({
          name: t.String(),
          description: t.String(),
        }),
      }
    );
