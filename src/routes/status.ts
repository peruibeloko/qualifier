import { Hono } from 'hono';

import { parseStatus } from '@/middlewares/status.ts';

import * as handlers from '@/core/status.ts';

const status = new Hono<{
  Variables: {
    status: number;
  };
}>();

status.get('/:status{[1-5][0-9]{2}}', parseStatus, handlers.getStatus);

export default status;
