import { Handler } from 'hono';

import * as Status from '@/external/httpstatus.ts';

export const getStatus: Handler = async c => {
  const status = c.get('status');
  const text = await Status.getStatus(status);
  return c.text(text);
};
