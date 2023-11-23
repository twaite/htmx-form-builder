/// <reference types="@kitajs/html/hotwire-turbo.d.ts" />

import type { ElysiaApp } from "app";
import Layout from "components/Layout";

export default (app: ElysiaApp) =>
  app.get("/", ({ params: { id } }) => {
    return (
      <Layout>
        <h1>{id}</h1>
      </Layout>
    );
  });
