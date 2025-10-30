import { zValidator } from '@hono/zod-validator';

import { Hono } from 'hono';

import {
  NewDomainRequestSchema,
  ProspectRequestSchema,
} from '@/qualifier/model/entity.ts';

import * as Qualifier from '@/qualifier/service.ts';

const routes = new Hono();

routes.post('/icp', zValidator('json', NewDomainRequestSchema), async c => {
  const { domain } = c.req.valid('json');
  const icp = await Qualifier.createICP(domain);
  return c.json(icp);
});

routes.post('/prospects', zValidator('json', ProspectRequestSchema), async c => {
  const { domains, icp } = await c.req.valid('json');
  const prospects = await Qualifier.createProspects(domains, icp);
  return c.json(prospects);
});

export { routes };
