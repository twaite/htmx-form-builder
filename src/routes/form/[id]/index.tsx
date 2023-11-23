/// <reference types="@kitajs/html/hotwire-turbo.d.ts" />

import type { ElysiaApp } from "app";
import { formRepo } from "repo";
import Layout from "components/Layout";

export default (app: ElysiaApp) =>
  app.get("/", ({ params: { id } }) => {
    return <h1>{id}</h1>;
  });
