import { ICP, Prospect } from '@/qualifier/model/entity.ts';

import * as OpenAI from '@/repositories/OpenAI.ts';
import * as Supabase from '@/repositories/Supabase.ts';

export async function createICP(domain: string): Promise<ICP> {
  const company = await OpenAI.analyzeDomain(domain);
  console.log(company);
  const icp = await OpenAI.generateICP(company);
  await Supabase.saveICP(icp);
  return icp;
}

export async function createProspects(
  domains: string[],
  icpId: string
): Promise<Prospect[]> {
  const icp = await Supabase.getICP(icpId);
  const prospects = await OpenAI.qualifyProspects(icp, domains);
  return prospects;
}
