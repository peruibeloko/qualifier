import {
  Company,
  ICP,
  Prospect
} from '@/qualifier/model/entity.ts';

import OpenAI from '@openai/openai';

const client = new OpenAI();

// todo figure out why its not returning correctly

export async function analyzeDomain(domain: string): Promise<Company> {
  const response = await client.responses
    .create({
      model: 'gpt-5-mini',
      reasoning: { effort: 'medium' },
      instructions:
        'Use exclusively information aquired on trusted internet sources',
      input: `Generate a report on the "${domain}" domain, using the provided\
JSON Schema. 'segment' and 'industry' should be as objective as possible,\
'companySize' should be a single order of magnitude (1K, 10K or 100K employees),\
'description' should clearly outline and summarize the company's activities.`,
      text: {
        format: {
          type: 'json_schema',
          name: 'company',
          strict: true,
          schema: {
            type: 'object',
            additionalProperties: false,
            required: [
              'name',
              'domain',
              'segment',
              'industry',
              'description',
              'companySize'
            ],
            properties: {
              name: { type: 'string' },
              domain: { type: 'string' },
              segment: { type: 'string' },
              industry: { type: 'string' },
              description: { type: 'string' },
              companySize: {
                type: 'string',
                enum: ['1K', '10K', '100K']
              }
            }
          }
        }
      }
    })
    .withResponse();

  return JSON.parse(response.data.output_text);
}

export async function generateICP(domainData: Company): Promise<ICP> {
  throw new Error('Function not implemented.');
}

export async function qualifyProspects(
  icp: ICP,
  domains: string[]
): Promise<Prospect[]> {
  throw new Error('Function not implemented.');
}
