import * as z from '@zod/zod';

export const NewDomainRequest = z.object({
  domain: z.url()
});

export const NewProspectsRequest = z.object({
  domains: z.array(z.url()),
  icpId: z.uuid()
});
