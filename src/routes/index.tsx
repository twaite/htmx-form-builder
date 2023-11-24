/// <reference types="@kitajs/html/hotwire-turbo.d.ts" />

import type { ElysiaApp } from 'app';
import Layout from 'components/Layout';

export default (app: ElysiaApp) =>
  app.get('/', () => (
    <Layout title="URL Builder">
      <div hx-get="/forms" hx-trigger="load" hx-push-history="true" />
    </Layout>
  ));
