import { Hono } from 'hono';

import { routes } from '@/router.ts';

const app = new Hono();

app.use(async (c, next) => {
  console.log(`${c.req.method.toUpperCase()} ${c.req.path}`);
  await next();
});

app.route('/', routes);

Deno.serve({ port: 8080 }, app.fetch);
