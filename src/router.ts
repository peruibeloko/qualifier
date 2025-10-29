import { vValidator } from '@hono/valibot-validator';

import { Hono } from 'hono';

import {
  NewDomainRequest,
  NewProspectsRequest
} from '@/qualifier/model/dto.ts';
import * as OpenAI from '@/repositories/OpenAI.ts';
import * as Supabase from '@/repositories/Supabase.ts';

const routes = new Hono();

routes.post('/company', vValidator('json', NewDomainRequest), async c => {
  const domain = c.req.valid('json');
  const company = await OpenAI.analyzeDomain(domain);
  const icp = await OpenAI.generateICP(company);
  await Supabase.saveICP(icp);
  return c.text(icp.id);
});

routes.post('/prospects', vValidator('json', NewProspectsRequest), async c => {
  const { domains, icpId } = c.req.valid('json');
  const icp = await Supabase.getICP(icpId);
  const prospects = await OpenAI.qualifyProspects(icp, domains);
  return c.json(prospects);
});

export { routes };

