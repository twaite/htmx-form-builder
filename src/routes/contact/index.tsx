import type { ElysiaApp } from "app";
import Layout from "components/Layout";

export default (app: ElysiaApp) =>
  app.get("/", () => (
    <Layout title="contact">
      <h1 class="text-3xl font-bold">"Hello World"</h1>
    </Layout>
  ));
