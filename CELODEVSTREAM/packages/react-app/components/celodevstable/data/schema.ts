import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const celodevsSchema = z.object({
  index: z.number(),
  owner: z.string(),
  name: z.string(),
  walletAddress: z.string(),
  paymentCurrency: z.string(),
  taskDescription: z.string(),
  rewardAmount: z.number(),
  dateCaptured: z.string(),
});

export type celodevsType = z.infer<typeof celodevsSchema>;
