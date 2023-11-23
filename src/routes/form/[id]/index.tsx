/// <reference types="@kitajs/html/hotwire-turbo.d.ts" />

import type { ElysiaApp } from "app";
import { NotFoundError } from "app/errors";
import Button from "components/Button";
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
            <form id="view-form" class="flex flex-col gap-3">
              <div>
                <h1 class="text-3xl">{form.name}</h1>
                <h3 class="text-lg">{form.description}</h3>
              </div>
              <Button
                hx-get={`/form/${id}/edit`}
                hx-target="closest #view-form"
                hx-swap="innerHTML"
                variant="secondary"
              >
                Edit
              </Button>
            </form>
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
