/// <reference types="@kitajs/html/hotwire-turbo.d.ts" />

import type { ElysiaApp } from "app";
import { NotFoundError } from "app/errors";
import Layout from "components/Layout";
import { PostgresError } from "postgres";
import { formRepo } from "repo";

export default (app: ElysiaApp) =>
  app.get("/", async ({ params: { id }, set }) => {
    try {
      const form = await formRepo.findByIdThrows(id);

      return (
        <Layout>
          <h1 class="text-3xl">{form.name}</h1>
          <h3 class="text-lg">{form.description}</h3>
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
  });
