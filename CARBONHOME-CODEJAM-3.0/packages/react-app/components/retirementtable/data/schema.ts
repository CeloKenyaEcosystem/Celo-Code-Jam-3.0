import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const retirementsSchema = z.object({
  index: z.number(),
  owner: z.string(),
  name: z.string(),
  walletAddress: z.string(),
});

export type retirementsType = z.infer<typeof retirementsSchema>;
