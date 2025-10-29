export type CompanySize = '1K' | '10K' | '100K';
export type FinancialStatus = 'VENTURE' | 'SELF_SUSTAINED';

export interface Company {
  name: string;
  domain: string;
  segment: string;
  companySize: CompanySize;
  description: string;
}

export interface Persona {
  department: string;
  role: string;
  painPoints: string[];
}

export interface ICP {
  id: string;
  title: string;
  description: string;
  companySize: CompanySize;
  stage: FinancialStatus;
  countries: string[];
  industries: string[];
  personas: Persona[];
}

export interface Prospect {
  company: Company;
  score: number;
  description: string;
}
