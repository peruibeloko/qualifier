import * as v from "@valibot/valibot";

export const NewDomainRequest = v.object({
  domain: v.url()
});

export const NewProspectsRequest = v.object({
  domains: v.array(v.url()),
  icpId: v.uuid()
});