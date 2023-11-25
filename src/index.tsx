import 'reflect-metadata';
import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';
import { tailwind } from 'elysia-tailwind'; // 1. Import
import { autoroutes } from 'elysia-autoroutes';
import { staticPlugin } from '@elysiajs/static';
import { container } from 'app/di';
import { FormRepository, StepRepository } from 'app/repo';

export const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .decorate('repos', {
    FormRepository: container.get(FormRepository),
    StepRepository: container.get(StepRepository),
  })
  .use(
    autoroutes({
      routesDir: './routes',
    }),
  )
  .use(
    tailwind({
      // 2. Use
      path: '/public/styles.css', // 2.1 Where to serve the compiled stylesheet;
      source: './src/input.css', // 2.2 Specify source file path (where your @tailwind directives are);
      config: './tailwind.config.js', // 2.3 Specify config file path or Config object;
      options: {
        // 2.4 Optionally Specify options:
        minify: true, // 2.4.1 Minify the output stylesheet (default: NODE_ENV === "production");
        map: true, // 2.4.2 Generate source map (default: NODE_ENV !== "production");
        autoprefixer: false, // 2.4.3 Whether to use autoprefixer;
      },
    }),
  )
  .listen(3000);

export type ElysiaApp = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
