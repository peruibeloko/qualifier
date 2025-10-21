import { Hono } from 'hono';

import status from '@/routes/status.ts';

const routes = new Hono();

routes.route('/status', status);

export { routes };
