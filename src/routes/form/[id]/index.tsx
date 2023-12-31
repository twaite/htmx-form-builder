/// <reference types="@kitajs/html/hotwire-turbo.d.ts" />

import type { ElysiaApp } from 'app';
import { NotFoundError } from 'app/errors';
import AddInputSidenav from 'components/AddInputSidenav';
import Button from 'components/Button';
import FormPreview from 'components/FormPreview';
import Layout from 'components/Layout';
import { t } from 'elysia';

export default (app: ElysiaApp) =>
  app
    .get('/', async ({ params: { id }, set, repos }) => {
      try {
        const form = await repos.FormRepository.get(id);

        return (
          <Layout>
            <div class="grid grid-cols-3 gap-4">
              <form id="view-form" class="col-span-2 flex flex-col gap-3">
                <div class="flex items-center">
                  <h1 class="flex-grow text-3xl">{form.name}</h1>
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
              <div>
                <FormPreview form={form} />
              </div>
            </div>
            <div class="flex">
              <AddInputSidenav />
            </div>
          </Layout>
        );
      } catch (e) {
        console.error(e);
        if (e instanceof NotFoundError) {
          set.status = 404;
          return '404 Not Found'; // TODO: error component
        }

        set.status = 500;
        return 'Internal Server Error'; // TODO: pretty error page
      }
    })
    .post(
      '/',
      async ({ params: { id }, body, set, repos }) => {
        await repos.FormRepository.update(id, body);

        set.headers = {
          'HX-Redirect': `/form/${id}/`,
        };
      },
      {
        body: t.Object({
          name: t.String(),
          description: t.String(),
        }),
      },
    );
