import { Company, ICP, Prospect } from '@/qualifier/model/entity.ts';

export function analyzeDomain(domain: string): Promise<Company> {
  throw new Error('Function not implemented.');
}

export function generateICP(domainData: Company): Promise<ICP> {
  throw new Error('Function not implemented.');
}

export function qualifyProspects(
  icp: ICP,
  domains: string[]
): Promise<Prospect[]> {
  throw new Error('Function not implemented.');
}
