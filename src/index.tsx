import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { tailwind } from "elysia-tailwind"; // 1. Import
import { autoroutes } from "elysia-autoroutes";

import Test from "./test";
import Layout from "components/Layout";

const app = new Elysia()
  .use(html())
  .use(
    autoroutes({
      routesDir: "./routes",
    })
  )
  .use(
    tailwind({
      // 2. Use
      path: "/public/styles.css", // 2.1 Where to serve the compiled stylesheet;
      source: "./src/input.css", // 2.2 Specify source file path (where your @tailwind directives are);
      config: "./tailwind.config.js", // 2.3 Specify config file path or Config object;
      options: {
        // 2.4 Optionally Specify options:
        minify: true, // 2.4.1 Minify the output stylesheet (default: NODE_ENV === "production");
        map: true, // 2.4.2 Generate source map (default: NODE_ENV !== "production");
        autoprefixer: false, // 2.4.3 Whether to use autoprefixer;
      },
    })
  )
  .get("/", () => (
    <Layout title="Hello World">
      <div hx-target="this" hx-swap="outerHTML" class="p-3 bg-blue-300">
        <div>
          <label>First Name</label>: Joe
        </div>
        <div>
          <label>Last Name</label>: Blow
        </div>
        <div>
          <label>Email</label>: joe@blow.com
        </div>
        <button hx-get="/contact/1/edit" class="btn btn-primary">
          Click To Edit
        </button>
        <h3>Test Component:</h3>
        <Test />
      </div>
    </Layout>
  ))
  .get("/test/", Test)
  .get("/contact/1/edit", () => (
    <form hx-put="/contact/1" hx-target="this" hx-swap="outerHTML">
      <div>
        <label>First Name</label>
        <input type="text" name="firstName" value="Joe" />
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input type="text" name="lastName" value="Blow" />
      </div>
      <div class="form-group">
        <label>Email Address</label>
        <input type="email" name="email" value="joe@blow.com" />
      </div>
      <button class="btn">Submit</button>
      <button class="btn" hx-get="/contact/1">
        Cancel
      </button>
    </form>
  ))
  .listen(3000);

export type ElysiaApp = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
