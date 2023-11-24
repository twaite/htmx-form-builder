/// <reference types="@kitajs/html/hotwire-turbo.d.ts" />

import Header from './Header';

export default function Layout(
  props: Html.PropsWithChildren<{ title?: string }>,
) {
  return (
    <>
      {'<!doctype html>'}
      <html lang="en">
        <head>
          <title>{props.title}</title>
          <script
            src="https://unpkg.com/htmx.org@1.9.9"
            integrity="sha384-QFjmbokDn2DjBjq+fM+8LUIVrAgqcNW2s0PjAxHETgRn9l4fvX31ZxDxvwQnyMOX"
            crossorigin="anonymous"
          ></script>
          <script src="https://unpkg.com/hyperscript.org@0.9.12"></script>
          <script src="/public/darkmode.js" />
          <link rel="stylesheet" type="text/css" href="/public/styles.css" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          ></meta>
        </head>
        <body class="bg-gray-50 dark:bg-slate-700 dark:text-emerald-50">
          <Header />
          <main class="p-5">{props.children}</main>
        </body>
      </html>
    </>
  );
}
