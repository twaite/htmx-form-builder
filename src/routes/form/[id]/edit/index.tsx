/// <reference types="@kitajs/html/hotwire-turbo.d.ts" />

import type { ElysiaApp } from 'app';
import { FormRepository } from 'app/repo';
import Button from 'components/Button';
import Input from 'components/Input';

export default (app: ElysiaApp) =>
  app.get('/', async ({ params: { id } }: { params: { id: string } }) => {
    const form = await FormRepository.get(id);
    return (
      <Html.Fragment>
        <div class="flex gap-2">
          <div class="flex-grow">
            <Input value={form.name} name="name" inputClasses="w-full" />
          </div>
          <Button hx-post={`/form/${id}/`}>Save Details</Button>
        </div>
        <Input value={form.description} name="description" type="textarea" />
      </Html.Fragment>
    );
  });
