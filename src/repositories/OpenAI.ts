import {
  Company,
  CompanyJSONSchema,
  ICP,
  ICPJSONSchema,
  Prospect,
  ProspectJSONSchema
} from '@/qualifier/model/entity.ts';

import OpenAI from '@openai/openai';

const client = new OpenAI();

export async function analyzeDomain(domain: string): Promise<Company> {
  const response = await client.responses
    .create({
      model: 'gpt-5-mini',
      reasoning: { effort: 'medium' },
      instructions:
        'Use exclusively information aquired on trusted internet sources',
      input: `Generate a report on the "${domain}" domain, using the provided JSON Schema. 'segment' and 'industry' should be as objective as possible, 'companySize' should be a single order of magnitude (1K, 10K or 100K employees), 'description' should clearly outline and summarize the company's activities.`,
      text: {
        format: {
          type: 'json_schema',
          name: 'company',
          strict: true,
          schema: CompanyJSONSchema
        }
      }
    })
    .withResponse();
  
  return JSON.parse(response.data.output_text);
}

export async function generateICP(domainData: Company): Promise<ICP> {
  const response = await client.responses
  .create({
    model: 'gpt-5-mini',
    reasoning: { effort: 'medium' },
    instructions: 'Use exclusively information provided by your input',
    input: `Generate an Ideal Customer Profile for the provided company, using the provided JSON Schema.
    
    Company data: ${JSON.stringify(domainData)}`,
    text: {
      format: {
        type: 'json_schema',
        name: 'icp',
        strict: true,
        schema: ICPJSONSchema
      }
    }
  })
  .withResponse();

  return JSON.parse(response.data.output_text);
}

export async function qualifyProspects(
  icp: ICP,
  domains: string[]
): Promise<Prospect[]> {
  const response = await client.responses
  .create({
      model: 'gpt-5-mini',
      reasoning: { effort: 'medium' },
      instructions:
        'Use exclusively information provided by your input and aquired on trusted internet sources',
      input: `First analyze the provided domains, and format that data using the 'company' property from the schema.
      
      Now, based on the provided Ideal Customer Profile, qualify each of the analyzed domains with a 0 to 100 fitness score, and a brief description justifying that score.
      
      Domain list: ${JSON.stringify(domains)}
      
      Ideal Customer Profile: ${JSON.stringify(icp)}`,
      text: {
        format: {
          type: 'json_schema',
          name: 'icp',
          strict: true,
          schema: {
            type: 'object',
            additionalProperties: false,
            required: ['prospects'],
            properties: {
              prospects: {
                type: 'array',
                items: ProspectJSONSchema
              }
            }
          }
        }
      }
    })
    .withResponse();

  return JSON.parse(response.data.output_text);
}
