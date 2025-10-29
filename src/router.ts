import { zValidator } from '@hono/zod-validator';

import { Hono } from 'hono';

import {
  NewDomainRequest,
  NewProspectsRequest
} from '@/qualifier/model/dto.ts';

import * as Qualifier from '@/qualifier/service.ts';

const routes = new Hono();

routes.post('/icp', zValidator('json', NewDomainRequest), async c => {
  const domain = c.req.valid('json');
  const icp = await Qualifier.createICP(domain);
  return c.text(icp.id);
});

routes.post('/prospects', zValidator('json', NewProspectsRequest), async c => {
  const { domains, icpId } = c.req.valid('json');
  const prospects = await Qualifier.createProspects(domains, icpId);
  return c.json(prospects);
});

export { routes };
