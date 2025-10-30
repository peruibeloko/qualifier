import z from '@zod/zod';

export type CompanySize = z.infer<typeof CompanySizeSchema>;
export const CompanySizeSchema = z.enum(['1K', '10K', '100K']);

export type FinancialStatus = z.infer<typeof FinancialStatusSchema>;
export const FinancialStatusSchema = z.enum(['SELF_SUSTAINED', 'VENTURE']);

export type Persona = z.infer<typeof PersonaSchema>;
export const PersonaSchema = z.object({
  department: z.string(),
  role: z.string(),
  painPoints: z.array(z.string())
});
export const PersonaJSONSchema = z.toJSONSchema(PersonaSchema);

export type Company = z.infer<typeof CompanySchema>;
export const CompanySchema = z.object({
  name: z.string(),
  domain: z.string(),
  segment: z.string(),
  industry: z.string(),
  companySize: CompanySizeSchema,
  description: z.string()
});
export const CompanyJSONSchema = z.toJSONSchema(CompanySchema);

export type ICP = z.infer<typeof ICPSchema>;
export const ICPSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  companySize: CompanySizeSchema,
  stage: FinancialStatusSchema,
  countries: z.array(z.string()),
  industries: z.array(z.string()),
  personas: z.array(PersonaSchema)
});
export const ICPJSONSchema = z.toJSONSchema(ICPSchema);

export type Prospect = z.infer<typeof ProspectSchema>;
export const ProspectSchema = z.object({
  company: CompanySchema,
  score: z.int(),
  description: z.string()
});
export const ProspectJSONSchema = z.toJSONSchema(ProspectSchema);

export const NewDomainRequestSchema = z.object({ domain: z.url() });
export const ProspectRequestSchema = z.object({
  domains: z.array(z.url()),
  icp: ICPSchema
});
