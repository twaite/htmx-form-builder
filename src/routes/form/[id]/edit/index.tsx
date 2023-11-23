/// <reference types="@kitajs/html/hotwire-turbo.d.ts" />

import type { ElysiaApp } from "app";
import { formRepo } from "app/repo";
import Button from "components/Button";
import Input from "components/Input";

export default (app: ElysiaApp) =>
  app.get("/", async ({ params: { id }, set }) => {
    const form = await formRepo.findByIdThrows(id);
    return (
      <Html.Fragment>
        <Input value={form.name} name="name" />
        <Input value={form.description} name="description" type="textarea" />
        <Button hx-post={`/form/${id}/`}>Save</Button>
      </Html.Fragment>
    );
  });
