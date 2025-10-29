import * as z from '@zod/zod';

export const CompanySize = {
  '1K': '1K',
  '10K': '10K',
  '100K': '100K'
} as const;

export const FinancialStatus = {
  VENTURE: 'VENTURE',
  SELF_SUSTAINED: 'SELF_SUSTAINED'
} as const;

export type Company = z.output<typeof CompanySchema>;
export const CompanySchema = z.object({
  name: z.string(),
  domain: z.url(),
  segment: z.string(),
  industry: z.string(),
  companySize: z.enum(CompanySize),
  description: z.string()
});

export interface Persona {
  department: string;
  role: string;
  painPoints: string[];
}

export interface ICP {
  id: string;
  title: string;
  description: string;
  companySize: keyof typeof CompanySize;
  stage: keyof typeof FinancialStatus;
  countries: string[];
  industries: string[];
  personas: Persona[];
}

export interface Prospect {
  company: Company;
  score: number;
  description: string;
}
