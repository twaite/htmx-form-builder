/// <reference types="@kitajs/html/hotwire-turbo.d.ts" />

export default function Layout(
  props: Html.PropsWithChildren<{ title?: string }>
) {
  return (
    <>
      {"<!doctype html>"}
      <html lang="en">
        <head>
          <title>{props.title}</title>
          <script
            src="https://unpkg.com/htmx.org@1.9.9"
            integrity="sha384-QFjmbokDn2DjBjq+fM+8LUIVrAgqcNW2s0PjAxHETgRn9l4fvX31ZxDxvwQnyMOX"
            crossorigin="anonymous"
          ></script>
          <link rel="stylesheet" type="text/css" href="public/styles.css" />
        </head>
        <body>{props.children}</body>
      </html>
    </>
  );
}
