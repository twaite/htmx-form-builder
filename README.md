# HTMX Dynamic Form Builder

This project implements a dynamic form builder. This is built with the following technologies:

- [Bun](https://bun.sh/)
- [Elysia](https://elysiajs.com/)
- [HTMX](https://htmx.org/)
- [JSX](https://react.dev/learn/writing-markup-with-jsx)
- [Tailwind](https://tailwindcss.com/)
- [Drizzle](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/)

## Getting Started

You will need [Bun](https://bun.sh/) and [docker](https://www.docker.com/) installed.

```bash
bun install
docker compose up -d
```

Next setup your .env file. Out of the box with docker compose this will be the following:

```
echo DB_URL=postgres://postgres:password@localhost:5430/htmx > .env
```

## Development

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

## Testing

// TODO
